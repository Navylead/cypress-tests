/// <reference types= "cypress" />

describe('Тесты МЕЙНА', ()=>{
    beforeEach(()=>{cy.viewport(1920, 1080)})

    it('МЭЙН. Поиск шаблонов по запросу', ()=>{
        cy.visit('https://flyvi.io/ru/templates')
        cy.get('.K65Y5O input').type('23 февраля').type('{enter}')
        cy.get('._1gypXs h2').contains('Шаблоны по запросу: 23 февраля').should('be.visible') // поиск по запросу
        cy.get('._1gypXs p').should('be.visible').invoke('text').then((x)=>{
            let count = parseInt(x)
            expect(count).to.be.greaterThan(100)
        }) // количество найденных шаблонов больше 100
        // cy.get('._3CNO1Z img._3NrnYu').first().click() // клик по первому шаблону в списке
        // cy.wait(2000)
        // cy.get('._12kiwf', {timeout:20000}).contains('a', 'Использовать в дизайне').should('be.visible') // Отображение попапа
    })

    it('МЭЙН. Поиск ФОТО по запросу', ()=>{
        cy.intercept('**/api/unsplash/search/photos?q=hawaii*').as('req')
        cy.visit('https://flyvi.io/ru/templates')
        cy.get('.filter').contains('a', 'Фото').click()
        cy.get('._72c54_ input').type('hawaii').type('{enter}')
        cy.wait('@req').then((foto)=>{
            expect((foto.response.body).length).to.eq(30)
        })
        cy.get('.unsplashes-result h2').contains('Фото по запросу: hawaii') 
        cy.get('.unsplashes-result .unsplashes-result__img').should('be.visible').and('have.length.greaterThan', 0)
    })
    
})