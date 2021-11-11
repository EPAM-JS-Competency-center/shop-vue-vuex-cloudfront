import { ProductsPage } from '../pageobjects';
import { clickOnElementTimes } from '../utils';

describe('Products page', () => {
    beforeAll(async () => {
        await ProductsPage.open();
    });

    it('should have 8 products on page', async () => {
        await expect(ProductsPage.productCards).toBeElementsArrayOfSize(8);
    });

    describe('Products cards layout', () => {
        it('should be present all elements on product cart', async () => {
            await expect(ProductsPage.productCardImage).toBeDisplayedInViewport();
            await expect(ProductsPage.productCardTitle).toBeDisplayedInViewport();
            await expect(ProductsPage.productCardText).toBeDisplayedInViewport();
            await expect(ProductsPage.productCardAddToCartBtn).toBeDisplayedInViewport();
        });

        it('should show increment/decrement buttons, when Add to Cart btn click', async () => {
            await ProductsPage.productCardAddToCartBtn.click();

            await expect(ProductsPage.productCardAddToCartBtn).not.toBeDisplayedInViewport();
            await expect(ProductsPage.productCardDecrementCountBtn).toBeDisplayedInViewport();
            await expect(ProductsPage.productCardCountNumber).toBeDisplayedInViewport();
            await expect(ProductsPage.productCardIncrementCountBtn).toBeDisplayedInViewport();
        });

        it('should be hidden action buttons if count is 1 and decrement btn clicked', async () => {
            await ProductsPage.productCardDecrementCountBtn.click();

            await expect(ProductsPage.productCardAddToCartBtn).toBeDisplayedInViewport();
            await expect(ProductsPage.productCardDecrementCountBtn).not.toBeDisplayedInViewport();
            await expect(ProductsPage.productCardCountNumber).not.toBeDisplayedInViewport();
            await expect(ProductsPage.productCardIncrementCountBtn).not.toBeDisplayedInViewport();
        });
    });

    describe('Products add to cart/count', () => {
        it('should be incremented product count', async () => {
            await ProductsPage.productCardAddToCartBtn.click();

            await expect(ProductsPage.productCardCountNumber).toHaveText('1');

            await clickOnElementTimes(ProductsPage.productCardIncrementCountBtn, 2);

            await expect(ProductsPage.productCardCountNumber).toHaveText('3');
        });

        it('should be decremented product count', async () => {
            await clickOnElementTimes(ProductsPage.productCardDecrementCountBtn, 2);

            await expect(ProductsPage.productCardCountNumber).toHaveText('1');
        });

        it('should be max count not greater than available product count', async () => {
            const availableProductCountText = await (await ProductsPage.productCardAvailableCount).getText();
            const availableProductCount = availableProductCountText.replace(/\D/g, '');

            await expect(ProductsPage.productCardAvailableCount).toHaveText('Count: 4');

            await clickOnElementTimes(ProductsPage.productCardIncrementCountBtn, 3)

            await expect(ProductsPage.productCardCountNumber).toHaveText(availableProductCount);
            await expect(ProductsPage.productCardIncrementCountBtn).toBeDisabled();
        });
    });

    describe('Header cart badge', () => {
        it('should be decreased header cart count badge when product count less then 1', async () => {
            await expect(ProductsPage.headerCartLinkBadge).toHaveText('1')

            await clickOnElementTimes(ProductsPage.productCardDecrementCountBtn, 4);

            await expect(ProductsPage.headerCartLinkBadge).toHaveText('')
        });

        it('should be increased header cart count badge when product count more then 1', async () => {
            await expect(ProductsPage.headerCartLinkBadge).toHaveText('')

            await ProductsPage.productCardAddToCartBtn.click();

            await expect(ProductsPage.headerCartLinkBadge).toHaveText('1')
        });
    });
});


