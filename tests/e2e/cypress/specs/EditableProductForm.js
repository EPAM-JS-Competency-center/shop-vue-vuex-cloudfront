const products = require('../fixtures/product-api.json');

const PRODUCT_PATH = '/admin/product-form';

describe('view: EditableProductForm', () => {
    beforeEach(() => {
        cy.visit(PRODUCT_PATH);
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

    it('Page: should contain correct h4 title', () => {
        cy.get('main h4')
            .should('contain', 'Create new product');
    });

    it('Create product: fill form & submit', () => {
        cy.get(`input[name="title"]`)
            .type("Product Name");

        cy.get(`input[name="description"]`)
            .type("Product Description");

        cy.get(`input[name="price"]`)
            .type("1000");

        cy.get(`input[name="count"]`)
            .type("12345");

        cy.intercept('PUT', '/dev/product', (req) => {
            expect(req.body).to.deep.equal({
                count: "012345",
                description: "Product Description",
                price: "01000",
                title: "Product Name",
            });
        })

        cy.get('button[type="submit"]').click();
    });

    it('Update product: should prefill form', () => {
        cy.intercept('GET', '/dev/product/100', ({
            title: "Product Title",
            description: "Product Description",
            count: "12345",
            price: "1111",
        }));

        cy.visit(`${PRODUCT_PATH}/100`);

        cy.get('main h4')
            .should('contain', 'Edit a product');

        cy.get(`input[name="title"]`)
            .should('have.value', 'Product Title');

        cy.get(`input[name="description"]`)
            .should('have.value', 'Product Description');

        cy.get(`input[name="price"]`)
            .should('have.value', '1111');

        cy.get(`input[name="count"]`)
            .should('have.value', '12345');
    });
});
