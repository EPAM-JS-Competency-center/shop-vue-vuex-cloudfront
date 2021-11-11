import Page from './page';
import { WdioElement, WdioElements } from '../types/models';
import { ProductsPage } from './index';
import { clickOnElementTimes } from '../utils';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {

	get checkoutContainer(): WdioElement {
		return $('div.v-stepper');
	}

	get checkoutHeader(): WdioElement {
		return this.checkoutContainer.$('h4');
	}

	get checkoutSteps(): WdioElements {
		return this.checkoutContainer.$$('div.v-stepper__header div.v-stepper__step');
	}

	get checkoutActiveStep(): WdioElement {
		return this.checkoutContainer.$('div.v-stepper__header div.v-stepper__step.v-stepper__step--active');
	}

	get checkoutActiveStepContent(): WdioElement {
		return $('div.v-stepper__content:not([style*="display: none"])');
	}

	get cartEmptyMessage(): WdioElement {
		return $('div.v-stepper__wrapper p.text-h6');
	}

	get cartShopButton(): WdioElement {
		return $('div.v-stepper__wrapper a[data-test-id="shop-button"]');
	}

	get cartProductsList(): WdioElement {
		return this.checkoutActiveStepContent.$('div.v-stepper__wrapper div[role="list"]');
	}

	get cartProducts(): WdioElements {
		return this.cartProductsList.$$('div[role="listitem"]');
	}

	get cartTotalSum(): WdioElement {
		return this.cartProductsList.$('div[role="listitem"] div.v-list-item__action p.text-h5');
	}

	get cartTo2StepBtn(): WdioElement {
		return this.checkoutContainer.$('button[data-test-id="to-2-step-button"]');
	}

	get cartTo3StepBtn(): WdioElement {
		return this.checkoutContainer.$('button[data-test-id="to-3-step-button"]');
	}

	get cartPlaceOrderBtn(): WdioElement {
		return this.checkoutContainer.$('button[data-test-id="place-order-button"]');
	}

	get cartShippingAddressForm(): WdioElement {
		return this.checkoutContainer.$('form.v-form');
	}

	get cartFormFirstNameInput(): WdioElement {
		return this.cartShippingAddressForm.$('div.v-input__control input[name="firstName"]');
	}

	get cartFormLastNameInput(): WdioElement {
		return this.cartShippingAddressForm.$('div.v-input__control input[name="lastName"]');
	}

	get cartFormAddressInput(): WdioElement {
		return this.cartShippingAddressForm.$('div.v-input__control input[name="address"]');
	}

	get cartFormCommentArea(): WdioElement {
		return this.cartShippingAddressForm.$('div.v-text-field__slot textarea[name="comment"]');
	}

	get cartFormErrors(): WdioElements {
		return this.cartShippingAddressForm.$$('div.v-text-field__details div.error--text');
	}

	get cartShippingAddressList(): WdioElement {
		return this.checkoutActiveStepContent.$('hr[role="separator"] + div[role="list"]');
	}

	get cartShippingAddressListItems(): WdioElements {
		return this.cartShippingAddressList.$$('div[role="listitem"]');
	}

	get cartBackBtn(): WdioElement {
		return this.checkoutActiveStepContent.$('button=Back')
	}

	getCartProductDecrementBtn(element: WdioElement): WdioElement {
		return element.$('button[data-test-id="decrement-product-count"]');
	}

	getCartProductIncrementBtn(element: WdioElement): WdioElement {
		return element.$('button[data-test-id="increment-product-count"]');
	}

	getCartProductCount(element: WdioElement): WdioElement {
		return element.$('span[data-test-id="product-count"]');
	}

	decreaseProductCount(product: WdioElement, count: number = 1): Promise<void> {
		const productIncreaseBtn = this.getCartProductDecrementBtn(product);

		return clickOnElementTimes(productIncreaseBtn, count);
	}

	async increaseProductCount(product: WdioElement, count: number = 1): Promise<void> {
		const productIncreaseBtn = this.getCartProductIncrementBtn(product);

		return clickOnElementTimes(productIncreaseBtn, count);
	}

	async addProductsToCart(): Promise<void> {
		const [ product1, product2, product3 ] = await ProductsPage.productCards;

		await ProductsPage.addProductsToCart([ product1, product2, product3 ]);
	}

	open(path: string = '/cart'): Promise<string> {
		return super.open(path);
	}
}

export default new CartPage();
