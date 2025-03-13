// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LoginPage from "./pageObjects/LoginPage.js"
import Dashboard from "./pageObjects/Dashboard.js"
const loginPage = new LoginPage()
const dashboard = new Dashboard()

Cypress.Commands.add('login3', (email, pass) => {
    cy.session('login', ()=>{
        cy.visit('https://flyvi.io/app/login')
        loginPage.getEmailInput().type(email)
        loginPage.getPasswordInput().type(pass)
        loginPage.getSubmitButton().click()
        dashboard.createDesignBtn().should('be.visible', {timeout:15000})
    })
})

Cypress.Commands.add('barDelete', ()=>{
    cy.get('.control_HJ2Cw button').last().click()
})

Cypress.Commands.add('decor', ()=>{
    cy.get('.story-box-inner__wrapper .decor-layer')
})

Cypress.Commands.add('designDelete', ()=>{
    cy.get('.card_idm0d').first().find('button').invoke('show').click()
    cy.get('.v-list.action-list.v-sheet.theme--light').contains('Удалить').click()
    cy.get('.vc-container').contains('Удалить').should('be.visible').click()
    cy.get('.Vue-Toastification__toast-body').contains('Дизайн успешно удален')
    cy.wait(500)
})

// Команда повторного удаления лишних декоров на холсте. 
// Если на холсте больше 0 декоров, то происходит удаление лишних декоров, пока холст не станет пустым
import Editor from "../support/pageObjects/Editor.js"
const editor = new Editor()

Cypress.Commands.add('retryDecorDelete', ()=>{
    cy.get('.story-box-inner__wrapper').then((l)=>{
        if(l.find('.decor-layer').length > 0) {          
            editor.getDecor().eq(0).click({force:true}) 
            editor.getDeleteButton().click()
            cy.retryDecorDelete();
        } 
        else{}})})
