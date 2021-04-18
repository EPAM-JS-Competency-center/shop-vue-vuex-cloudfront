Cypress.Commands.add('shouldContainBaseLayout', ({ title }) => {
    cy.get('header')
        .should('contain', title);

    cy.get('main');

    cy.get('footer');
});

Cypress.Commands.add('shouldContainFooter', ({ text }) => {
    cy.get('footer')
        .should('contain', text);
});

Cypress.Commands.add('shouldContainAccountMenuLink', ({ index, href, menuLinkName }) => {
    cy.get('header [data-test-id="account-button"]')
        .click();

    cy.get(`[data-test-id="account-menu"] > a:nth-child(${index})`)
        .should('have.attr', 'href', href)
        .and('contain', menuLinkName);
});