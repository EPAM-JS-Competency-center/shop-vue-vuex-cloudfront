// https://docs.cypress.io/api/introduction/api.html
const orders = require('../fixtures/orders.json');

describe('view: ProductOrders', () => {
    beforeEach(() => {
        cy.visit('/admin/orders');
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
        });
    });

    it('Page: should contain correct h5 title', () => {
        cy.get('main h5')
            .should('contain', 'Manage orders');
    });

    it('Page: should render order list', () => {
        cy.intercept('/dev/order', orders).as('waitOrders')

        cy.wait('@waitOrders');

        cy.get('[data-testid="orders-table"] tbody')
            .find('tr')
            .should('have.length', 2);
    });

    it('Order table: should contain first column (name)', () => {
        cy.intercept('/dev/order', orders).as('waitOrders')

        cy.wait('@waitOrders');

        cy.get('[data-testid="orders-table"] tbody tr')
            .eq(1)
            .find('td')
            .eq(0)
            .should('contain', "firstName lastName");
    });

    it('Order table: should contain second column (count)', () => {
        cy.intercept('/dev/order', orders).as('waitOrders')

        cy.wait('@waitOrders');

        cy.get('[data-testid="orders-table"] tbody tr')
            .eq(1)
            .find('td')
            .eq(1)
            .should('contain', "1");
    });

    it('Order table: should contain second column (address)', () => {
        cy.intercept('/dev/order', orders).as('waitOrders')

        cy.wait('@waitOrders');

        cy.get('[data-testid="orders-table"] tbody tr')
            .eq(1)
            .find('td')
            .eq(2)
            .should('contain', "address details");
    });

    it('Order table: should contain second column (status)', () => {
        cy.intercept('/dev/order', orders).as('waitOrders')

        cy.wait('@waitOrders');

        cy.get('[data-testid="orders-table"] tbody tr')
            .eq(1)
            .find('td')
            .eq(3)
            .should('contain', "CANCELLED");
    });

    it('Order table: should contain `Manager` link', () => {
        cy.intercept('/dev/order', orders).as('waitOrders')

        cy.wait('@waitOrders');

        cy.get('[data-testid="orders-table"] tbody tr')
            .eq(0)
            .find('[data-testid="manage-order"]')
            .first()
            .should('contain', "Manage")
            .and('have.attr', "href", "/admin/order/1");
    });

    it('Order table: should contain `Delete` button', () => {
        cy.intercept('/dev/order', orders).as('waitOrders')

        cy.wait('@waitOrders');

        cy.get('[data-testid="orders-table"] tbody tr')
            .eq(0)
            .find('[data-testid="delete-order"]')
            .first()
            .should('contain', "Delete");
    });
});
