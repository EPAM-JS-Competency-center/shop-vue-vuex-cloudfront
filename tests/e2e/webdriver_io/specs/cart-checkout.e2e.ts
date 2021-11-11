import { CartPage } from '../pageobjects';
import { WdioElement } from '../types/models';

describe('Cart page', () => {
	beforeAll(async () => {
		await CartPage.open();
		await CartPage.closeNetworkMessage();
	});

	describe('Layout elements', () => {
		it('should be present title', async () => {
			await expect(CartPage.checkoutHeader).toHaveText('Checkout');
		});

		it('should be displayed 4 steps in stepper', async () => {
			const [step1, step2, step3, step4] = await CartPage.checkoutSteps;

			await expect(CartPage.checkoutSteps).toBeElementsArrayOfSize(4);
			await expect(step1).toHaveText('1\nReview your cart');
			await expect(step2).toHaveText('2\nShipping address');
			await expect(step3).toHaveText('3\nReview your order');
			await expect(step4).toHaveText('4\ncomplete the order');
		});

		it('should be inactive first step in stepper', async () => {
			await expect(CartPage.checkoutActiveStep).not.toExist();
		});

		it('should be displayed empty message and shop button', async () => {
			await expect(CartPage.cartEmptyMessage).toHaveText('The cart is empty. Didn\'t you like anything in our shop?');
			await expect(CartPage.cartShopButton).toBeDisplayedInViewport();
		});
	});

	describe('Cart checkout steps', () => {
		beforeAll(async () => {
			await CartPage.cartShopButton.click();
			await CartPage.addProductsToCart();
			await CartPage.headerCartLink.click();
		});

		describe('Cart checkout: Review Your Cart', () => {

			it('should be added products to cart and updated header cart badge count', async () => {
				await expect(CartPage.headerCartLinkBadge).toHaveText('3');
				await expect(browser).toHaveUrlContaining('/cart');
			});

			it('should become active first step in stepper', async () => {
				await expect(CartPage.checkoutActiveStep).toHaveText('1\nReview your cart');
				await expect(CartPage.checkoutSteps[1]).toHaveClassContaining('v-stepper__step--inactive');
				await expect(CartPage.checkoutSteps[2]).toHaveClassContaining('v-stepper__step--inactive');
				await expect(CartPage.checkoutSteps[3]).toHaveClassContaining('v-stepper__step--inactive');
			});

			it('should be listed products', async () => {
				await expect(CartPage.cartProductsList).toBeDisplayedInViewport();
				await expect(CartPage.cartProducts).toBeElementsArrayOfSize(5);

				await expect(CartPage.cartEmptyMessage).not.toBeDisplayed();
				await expect(CartPage.cartShopButton).not.toBeDisplayed();
			});

			it('should be increased product count and changed Total value', async () => {
				// @ts-ignore
				const product = CartPage.cartProducts[0] as WdioElement;

				await expect(CartPage.cartTotalSum).toHaveText('$35.40');
				await expect(CartPage.getCartProductCount(product)).toHaveText('1');

				await CartPage.increaseProductCount(product, 3);

				await expect(CartPage.getCartProductCount(product)).toHaveText('4');
				await expect(CartPage.cartTotalSum).not.toHaveText('$35.40');
			});

			it('should be increased product count and changed Total value', async () => {
				// @ts-ignore
				const product = CartPage.cartProducts[0] as WdioElement;

				await CartPage.decreaseProductCount(product, 3);

				await expect(CartPage.getCartProductCount(product)).toHaveText('1');
				await expect(CartPage.cartTotalSum).toHaveText('$35.40');
			});
		});

		describe('Cart checkout: Shipping address', () => {
			beforeAll(async () => {
				await CartPage.cartTo2StepBtn.click();
				await CartPage.closeNetworkMessage();
			})

			it('should be marked as completed first and become active second step', async () => {
				await expect(CartPage.checkoutActiveStep).toHaveText('2\nShipping address');
				await expect(CartPage.checkoutSteps[0]).toHaveClassContaining('v-stepper__step--complete');
				await expect(CartPage.checkoutSteps[2]).toHaveClassContaining('v-stepper__step--inactive');
				await expect(CartPage.checkoutSteps[3]).toHaveClassContaining('v-stepper__step--inactive');
			});

			it('should be displayed 4 form fields', async () => {
				await expect(CartPage.cartFormFirstNameInput).toBeDisplayedInViewport();
				await expect(CartPage.cartFormLastNameInput).toBeDisplayedInViewport();
				await expect(CartPage.cartFormAddressInput).toBeDisplayedInViewport();
				await expect(CartPage.cartFormCommentArea).toBeDisplayedInViewport();
			});

			it('should appear errors when click on Next button with empty form fields', async () => {
				await CartPage.cartTo3StepBtn.click();

				await expect(CartPage.cartFormErrors).toBeElementsArrayOfSize(3);
				await expect(CartPage.cartFormErrors[0]).toHaveText('Field is required');
			});

			it('should be filled shipping address form', async () => {
				await CartPage.cartFormFirstNameInput.setValue('John')
				await CartPage.cartFormLastNameInput.setValue('Smith')
				await CartPage.cartFormAddressInput.setValue('123456, Green st, Washington, US')
				await CartPage.cartFormCommentArea.setValue('Some awesome and useful comment')

				await expect(CartPage.cartFormErrors).toBeElementsArrayOfSize(0);
				await expect(CartPage.cartFormErrors[0]).not.toBeDisplayed();
			});
		});

		describe('Cart checkout: Review your order', () => {
			beforeAll(async () => {
				await CartPage.cartTo3StepBtn.click();
			});

			it('should be marked as completed first and second steps, and become active third', async () => {
				await expect(CartPage.checkoutActiveStep).toHaveText('3\nReview your order');
				await expect(CartPage.checkoutSteps[0]).toHaveClassContaining('v-stepper__step--complete');
				await expect(CartPage.checkoutSteps[1]).toHaveClassContaining('v-stepper__step--complete');
				await expect(CartPage.checkoutSteps[3]).toHaveClassContaining('v-stepper__step--inactive');
			});

			it('should be displayed ordered products list and total price', async () => {
				await expect(CartPage.cartProductsList).toBeDisplayedInViewport();
				await expect(CartPage.cartProducts).toBeElementsArrayOfSize(5);
				await expect(CartPage.cartTotalSum).toHaveText('$35.40');
			});

			it('should be displayed provided shipping address', async () => {
				await expect(CartPage.cartShippingAddressList).toBeDisplayedInViewport();

				await expect(CartPage.cartShippingAddressListItems[0]).toHaveText('Shipping address\nJohn Smith\n123456, Green st, Washington, US');
				await expect(CartPage.cartShippingAddressListItems[1]).toHaveText('Comment:\nSome awesome and useful comment');
			});

			it('should be navigated into previous step and changed the comment', async () => {
				await CartPage.cartBackBtn.click();

				await expect(CartPage.checkoutActiveStep).not.toHaveText('3\nReview your order');

				await CartPage.cartFormCommentArea.setValue('. Edited Comment');
				await CartPage.cartTo3StepBtn.click();

				// fix for waiting animation to complete
				await browser.pause(500);

				await expect(CartPage.checkoutActiveStep).toHaveText('3\nReview your order');
				await expect(CartPage.cartShippingAddressListItems[1]).toHaveText('Comment:\nSome awesome and useful comment. Edited Comment');
			});
		});
	});
});
