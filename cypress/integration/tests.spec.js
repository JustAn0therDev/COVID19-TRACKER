/// <reference types="cypress" />

const milissecondsToWait = 1000;

context('Looking for different countries', () => {
    it("Brazil - COVID CASES", () => {
        cy.visit('https://justan0therdev.github.io/COVID19-TRACKER/');
        cy.get('input').type('brazil');

        cy.get('button[type="button"]').click();
        cy.wait(milissecondsToWait);

        cy.get('.div-mainCovid19Data').should('not.be.empty');
    });

    it('France - COVID CASES', () => {
        cy.visit('https://justan0therdev.github.io/COVID19-TRACKER/');
        cy.get('input').type('france');
        
        cy.get('button[type="button"]').click();
        cy.wait(milissecondsToWait);

        cy.get('.div-mainCovid19Data').should('not.be.empty');
    });

    it('USA - COVID CASES', () => {
        cy.visit('https://justan0therdev.github.io/COVID19-TRACKER/');
        cy.get('input').type('usa');

        cy.get('button[type="button"]').click();
        cy.wait(milissecondsToWait);

        cy.get('.div-mainCovid19Data').should('not.be.empty');
    });
});

context("API returned the current day's data", () => {
    it('Last checked contains the current date', () => {
        cy.visit('https://justan0therdev.github.io/COVID19-TRACKER/');
        cy.get('input').type('france');
        
        cy.get('button[type="button"]').click();
        cy.wait(milissecondsToWait);

        cy.get('ul:last li:first').should('have.text', `Last checked: ${new Date().toLocaleDateString()}`);
    });
})