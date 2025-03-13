/// <reference types= "cypress" />

import Editor from "../support/pageObjects/Editor.js"
const editor = new Editor()

describe('РЕЛИЗНЫЕ ТЕСТЫ', ()=>{

    describe('Проверка ПРЕМИУМНОСТИ', ()=>{    
        beforeEach(()=>{cy.viewport(1920, 1080)
        cy.login3(Cypress.env('guestEmail'), Cypress.env('guestPass')) }) // Вход в ГОСТЕВОЙ акк

it('Проверка премиумности при скачивании: ИКОНКА', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 1').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской
    })

it('Проверка премиумности при скачивании: ВЕКТОР', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 2').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it('Проверка премиумности при скачивании: ШРИФТ', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 3').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it('Проверка премиумности при скачивании: АНИМАЦИЯ', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 4').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it.skip('Проверка премиумности при скачивании: АНИМАЦИЯ для декоров <<<ПОКА НЕ РАБОТАЕТ>>>', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 5').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it('Проверка премиумности при скачивании: ФИГУРА', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 6').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it('Проверка премиумности при скачивании: ЭЛЕМЕНТ', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 7').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it('Проверка премиумности при скачивании: ШАБЛОН', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 8').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it('Проверка премиумности при скачивании: МАСКА', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 9').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it('Проверка премиумности при скачивании: ФОН', ()=>{
    cy.visit('https://flyvi.io/app/designs/a9d4defc-7041-452a-91c4-9c9569eceea6')
    editor.changesSavedBtn().should('be.visible')
    editor.getDownloadBtn().should('be.visible').click()        // Клик по кнопке СКАЧАТЬ
    cy.contains('button', 'Все страницы').click()               // Клик по меню со страницами дизайна
    cy.get('[role="menu"]').eq(1).contains('button', 'Все страницы').click()         // Клик по "Всем страницам"
    cy.get('[role="menu"]').eq(1).contains('button', 'Страница 10').click()           // Клик по чекбоксу первой страницы
    cy.get('[class="completeBtn_Gdq+-"]:contains("Готово")').click()                 // Клик по кнопке ГОТОВО
    cy.get('[class="site-story-download__menu"] button:contains("Скачать")').click() // Клик по кнопке СКАЧАТЬ
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                            // Отображение попапа с платной подпиской   
})

it('Премиум - изменить размер дизайна', ()=>{
    cy.visit('https://flyvi.io/app/designs/bfa1beaf-4a61-44b1-9596-4cf4cac3b25d')
    editor.getResizeButton().should('be.visible').click()
    cy.get('[role="option"]').contains('Визитка').click()
    cy.get('.change-size-actions button:contains("Изменить")').should('be.visible').click()
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                           // Отображение попапа с платной подпиской
})

it('Премиум - Убрать водяной знак', ()=>{
    cy.visit('https://flyvi.io/app/designs/bfa1beaf-4a61-44b1-9596-4cf4cac3b25d')
    editor.getDownloadBtn().should('be.visible').click()
    cy.contains('Отображение водяного знака').click()
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                           // Отображение попапа с платной подпиской
})

it('Премиум - Прозрачный фон', ()=>{
    cy.visit('https://flyvi.io/app/designs/bfa1beaf-4a61-44b1-9596-4cf4cac3b25d')
    editor.getDownloadBtn().should('be.visible').click()
    cy.contains('Прозрачный фон').click()
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                           // Отображение попапа с платной подпиской
})

it('Премиум - Изменить размер при скачивании', ()=>{
    cy.visit('https://flyvi.io/app/designs/bfa1beaf-4a61-44b1-9596-4cf4cac3b25d')
    editor.getDownloadBtn().should('be.visible').click()
    cy.contains('Размер').click()
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                           // Отображение попапа с платной подпиской
})

it('Премиум - Деформация для ФОТО', ()=>{
    cy.visit('https://flyvi.io/app/designs/bfa1beaf-4a61-44b1-9596-4cf4cac3b25d')
    editor.getDecor().click()
    cy.contains('Деформация').click()
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                           // Отображение попапа с платной подпиской
})

it('Премиум - Удалить фон у ФОТО', ()=>{
    cy.visit('https://flyvi.io/app/designs/bfa1beaf-4a61-44b1-9596-4cf4cac3b25d')
    editor.getDecor().click()
    cy.contains('Удалить фон').click()
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                           // Отображение попапа с платной подпиской
})

it('Премиум - Применить ластик для ФОТО', ()=>{
    cy.visit('https://flyvi.io/app/designs/bfa1beaf-4a61-44b1-9596-4cf4cac3b25d')
    editor.getDecor().click()
    cy.contains('Стереть').click()
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                           // Отображение попапа с платной подпиской
})

it('Переход на тариф ПРО из ЛК', ()=>{
    cy.visit('https://flyvi.io/app')
    cy.contains('Попробовать Flyvi Pro').click()
    cy.get('[class="dialogWrapper_FVcGt"] button:contains("Получить бесплатную пробную версию")')
    .should('be.visible')                                                           // Отображение попапа с платной подпиской
})

})
})