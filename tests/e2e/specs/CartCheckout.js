const products = require('../fixtures/product-api.json');

const successCheckout = {
    "items": [
        { "productId": "7567ec4b-b10c-48c5-9345-fc73c48a80a0", "count": 1 }
    ],
    "address": {
        "firstName": "Vasiliy",
        "lastName": "Pupkin",
        "address": "Nevskiy st.",
        "comment": "my first purchase"
    }
};

describe('view: CartCheckout', () => {
    beforeEach(() => {
        cy.visit('/cart');
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
            .should('contain', 'Checkout');
    });

    it('Scenario: pass every step one-by-one', () => {
        cy.get('[data-test-id="shop-button"]')
            .click();

        cy.intercept('PUT', '/dev/profile/cart/', []);

        cy.intercept('/dev/product/available/', products)
            .as('getAvailableProducts');

        cy.wait('@getAvailableProducts');

        cy.get('[data-test-id="product-card"]')
            .eq(1)
            .find('[data-test-id="add-product-button"]')
            .click();

        // to /cart
        cy.go('back');

        cy.get('[data-test-id="to-2-step-button"]')
            .click();

        // fill shipping address form
        cy.get(`input[name="firstName"]`)
            .type("Vasiliy");

        cy.get(`input[name="lastName"]`)
            .type("Pupkin");

        cy.get(`input[name="address"]`)
            .type("Nevskiy st.");

        cy.get(`textarea[name="comment"]`)
            .type("my first purchase");

        cy.get('[data-test-id="to-3-step-button"]')
            .click();

        // review order step, place order
        cy.get('[data-test-id="place-order-button"]')
            .click();
        //
        cy.intercept('PUT', '/dev/order', (req) => {
            expect(req.body).to.deep.equal(successCheckout);
        })
    });

});
