const products = require('../fixtures/product-api.json');

describe('view: ProductImport', () => {
    beforeEach(() => {
        cy.visit('/admin/products');
    });

    it('Layout: should be present', () => {
        cy.shouldContainBaseLayout({ title: "My store!" })
    });

    it('Footer: should contain copyright', () => {
        cy.shouldContainFooter({ text: 'Copyright © My store!' })
    });

    it('Footer: should tell thank you', () => {
        cy.shouldContainFooter({ text: 'Thank you for your purchase!' })
    });

    it('Header: should contain account-button', () => {
        cy.get('header [data-test-id="account-button"]');
    });

    it('Header: should contain cart link', () => {
        cy.get('header a[data-test-id="cart-link"]')
            .should('have.attr', 'href', '/cart');
    });

    it('Header: should contain account menu (3 items)', () => {
        cy.get('header [data-test-id="account-button"]')
            .click();

        cy.get('[data-test-id="account-menu"] > a')
            .should('have.length', 3);
    });

    it('Account menu: should contain `Manager orders` link', () => {
        cy.shouldContainAccountMenuLink({
            index: 1,
            href: '/admin/orders',
            menuLinkName: 'Manage orders'
        })
    });

    it('Account menu: should contain `Manager products` link', () => {
        cy.shouldContainAccountMenuLink({
            index: 2,
            href: '/admin/products',
            menuLinkName: 'Manage products'
        })
    });

    it('Account menu: should contain `Create new product` link', () => {
        cy.shouldContainAccountMenuLink({
            index: 3,
            href: '/admin/product-form',
            menuLinkName: 'Create new product'
        })
    });

    it('Page: should contain correct h5 title', () => {
        cy.get('main h5')
            .should('contain', 'Import Product CSV');
    });
});
