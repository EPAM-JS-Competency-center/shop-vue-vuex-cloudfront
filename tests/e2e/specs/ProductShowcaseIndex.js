const products = require('../fixtures/product-api.json');

describe('view: ProductShowcaseIndex', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Layout: should be present', () => {
        cy.intercept('/dev/product/available/', []);

        cy.shouldContainBaseLayout({ title: "My store!" })
    });

    it('Footer: should contain copyright', () => {
        cy.shouldContainFooter({ text: 'Copyright © My store!' })
    });

    it('Footer: should tell thank you', () => {
        cy.intercept('/dev/product/available/', []);

        cy.shouldContainFooter({ text: 'Thank you for your purchase!' })
    });

    it('Header: should contain account-button', () => {
        cy.intercept('/dev/product/available/', []);

        cy.get('header [data-test-id="account-button"]');
    });

    it('Header: should contain cart link', () => {
        cy.intercept('/dev/product/available/', []);

        cy.get('header a[data-test-id="cart-link"]')
            .should('have.attr', 'href', '/cart');
    });

    it('Header: should contain account menu (3 items)', () => {
        cy.intercept('/dev/product/available/', []);

        cy.get('header [data-test-id="account-button"]')
            .click();

        cy.get('[data-test-id="account-menu"] > a')
            .should('have.length', 3);
    });

    it('Account menu: should contain `Manager orders` link', () => {
        cy.intercept('/dev/product/available/', []);

        cy.shouldContainAccountMenuLink({
            index: 1,
            href: '/admin/orders',
            menuLinkName: 'Manage orders'
        })
    });

    it('Account menu: should contain `Manager products` link', () => {
        cy.intercept('/dev/product/available/', []);

        cy.shouldContainAccountMenuLink({
            index: 2,
            href: '/admin/products',
            menuLinkName: 'Manage products'
        })
    });

    it('Account menu: should contain `Create new product` link', () => {
        cy.intercept('/dev/product/available/', []);

        cy.shouldContainAccountMenuLink({
            index: 3,
            href: '/admin/product-form',
            menuLinkName: 'Create new product'
        })
    });

    it('Product cart: should render list (8 mocks)', () => {
        cy.intercept('/dev/product/available/', products, {log: false})
            .as('getAvailableProducts');

        cy.wait('@getAvailableProducts');

        cy.get('[data-test-id="product-card"]')
            .should('have.length', 8);
    });

    it('Product cart: should render card info (2 card)', () => {
        cy.intercept('/dev/product/available/', products)
            .as('getAvailableProducts');

        cy.wait('@getAvailableProducts');

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .should('contain', 'Price: $10.00')
            .and("contain", 'Count: 6')
            .and('contain', 'Short Product Description3');
    });

    it('Product cart: can toggle addProductButton', () => {
        cy.intercept('PUT', '/dev/profile/cart/', []);

        cy.intercept('/dev/product/available/', products)
            .as('getAvailableProducts');

        cy.wait('@getAvailableProducts');

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="add-product-button"]')
            .click();

        cy.get('[data-test-id="decrement-product-count"');

        cy.get('[data-test-id="increment-product-count"');
    });

    it('Product cart: can increment product', () => {
        cy.intercept('PUT', '/dev/profile/cart/', []);

        cy.intercept('/dev/product/available/', products)
            .as('getAvailableProducts');

        cy.wait('@getAvailableProducts');

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="add-product-button"]')
            .click();

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="product-count"]')
            .should('contain', '1');

        cy.get('[data-test-id="increment-product-count"')
            .click()

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="product-count"]')
            .should('contain', '2');
    });

    it('Product cart: can decrement product', () => {
        cy.intercept('PUT', '/dev/profile/cart/', []);

        cy.intercept('/dev/product/available/', products)
            .as('getAvailableProducts');

        cy.wait('@getAvailableProducts');

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="add-product-button"]')
            .click();

        // 1
        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="product-count"]')
            .should('contain', '1');

        // 2
        cy.get('[data-test-id="increment-product-count"')
            .click()

        // 3
        cy.get('[data-test-id="increment-product-count"')
            .click()

        // 4
        cy.get('[data-test-id="increment-product-count"')
            .click()

        // 3
        cy.get('[data-test-id="decrement-product-count"')
            .click()

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="product-count"]')
            .should('contain', '3');
    });

    it('Heaer: should provide cart feedback (badges)', () => {
        cy.intercept('PUT', '/dev/profile/cart/', []);

        cy.intercept('/dev/product/available/', products)
            .as('getAvailableProducts');

        cy.wait('@getAvailableProducts');

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="add-product-button"]')
            .click();

        cy.get('[data-test-id="product-card"]')
            .eq(0)
            .find('[data-test-id="add-product-button"]')
            .click();

        cy.get('[data-test-id="product-card"]')
            .eq(4)
            .find('[data-test-id="add-product-button"]')
            .click();

        cy.get('header [data-test-id="cart-link"]')
            .should('contain', 3);
    });
});
