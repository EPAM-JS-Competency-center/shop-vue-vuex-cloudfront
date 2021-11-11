import Page from './page';
import { WdioElement, WdioElements } from '../types/models';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends Page {
    readonly cartButtonSelector = 'button[data-test-id="add-product-button"]';

    get productCard(): WdioElement {
        return this.mainContent.$('div[data-test-id="product-card"]');
    }

    get productCards(): WdioElements {
        return this.mainContent.$$('div[data-test-id="product-card"]');
    }

    get productCardImage(): WdioElement {
        return this.productCard.$('div.v-image')
    }

    get productCardTitle(): WdioElement {
        return this.productCard.$('div.v-card__title')
    }

    get productCardText(): WdioElement {
        return this.productCard.$('div.v-card__text p.subtitle-1')
    }

    get productCardAvailableCount(): WdioElement {
        return this.productCard.$('div.v-card__text p[data-test-id="product-count"]')
    }

    get productCardAddToCartBtn(): WdioElement {
        return this.productCard.$(`div.v-card__actions ${ this.cartButtonSelector }`)
    }

    get productCardCountNumber(): WdioElement {
        return this.productCard.$('div.v-card__actions span[data-test-id="product-count"]')
    }

    get productCardDecrementCountBtn(): WdioElement {
        return this.productCard.$('div.v-card__actions button[data-test-id="decrement-product-count"]')
    }

    get productCardIncrementCountBtn(): WdioElement {
        return this.productCard.$('div.v-card__actions button[data-test-id="increment-product-count"]')
    }

    async addProductsToCart(productCards: WebdriverIO.Element[]): Promise<void> {
        // await Promise.all(productCards.map(product => product.$(this.cartButtonSelector).click()));
        for (const product of productCards) {
            await product.$(this.cartButtonSelector).click();
        }
    }
}

export default new ProductsPage();
