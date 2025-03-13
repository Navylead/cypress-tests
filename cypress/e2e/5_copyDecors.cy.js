/// <reference types= "cypress" />

import Header from "../support/pageObjects/Header.js"
const header = new Header()
import Button from "../support/pageObjects/Button.js"
const button = new Button()

describe.skip('Копирование декоров', ()=>{
    beforeEach(()=>{
        cy.viewport(1920, 1080)
        cy.login3(Cypress.env('pMail2'), Cypress.env('pPass2'))     // Вход в акк - brekinbeetle@yandex.ru
    }) 

    it.only('КОПИРОВАНИЕ ТЕКСТА', function(){
        cy.visit('https://flyvi.io/app/designs/9b1d6903-7b3a-4e49-a51b-3b4f1116ebe6')
        cy.intercept('https://api.flyvi.io/api/decors-types/popular?type=TEMPLATE*').as('system')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@system', {timeout:10000})
        cy.get('.story-box-inner__wrapper').contains('span', 'SALE').rightclick() // Клик по тексту на хосте
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию текста
        cy.wait(300)
        cy.reload() 
        cy.intercept('https://api.flyvi.io/api/decors-types/popular?type=TEMPLATE*').as('system')
        cy.wait('@system', {timeout:10000})
        cy.get('.story-box-inner__wrapper .flyvi-text')
        .its('length')
        .should('eq', 2) // Проверка отображения двух декоров на холсте
        cy.get('.story-box-inner__wrapper .flyvi-text').last().click() // Клик по второму тексту
        cy.barDelete() // Удалить выбранный декор
        cy.get('.story-box-inner__wrapper .flyvi-text')
        .its('length').should('eq', 1) // Проверка отображения одного текста на холсте
        cy.wait(300)
    })

    it.only('КОПИРОВАНИЕ АНСПЛЭШ', function(){
        cy.visit('https://flyvi.io/app/designs/7c44e1f0-8cd0-40cf-9c1c-0b516f011dca')
        cy.intercept('https://api.flyvi.io/api/decors-types/popular?type=TEMPLATE*').as('system')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@system', {timeout:10000})
        cy.get('.story-box-inner__wrapper .decor-layer__inner').rightclick() // Клик по фото на холсте
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/decors-types/popular?type=TEMPLATE*').as('system')
        cy.wait('@system', {timeout:10000})
        cy.get('.story-box-inner__wrapper img').its('length').should('eq', 2) // Проверка, что на холсте два декора
        cy.get('.story-box-inner__wrapper .decor-layer__inner').last().click() // Клик по второму фото
        cy.barDelete() // Удалить декор
        cy.get('.story-box-inner__wrapper img').its('length').should('eq', 1) // Проверка, что холсте осталось одно фото
        cy.wait(300)
    })

    it.only('КОПИРОВАНИЕ АПЛОАД', function(){
        cy.visit('https://flyvi.io/app/designs/ea9de090-acc8-4163-9945-63b69a08225f')
        cy.intercept('https://api.flyvi.io/api/decors-types/popular?type=TEMPLATE*').as('system')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@system', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/decors-types/popular?type=TEMPLATE*').as('system')
        cy.wait('@system', {timeout:10000})
        cy.get('.decor-layer__inner img').its('length').should('eq', 2) // Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete() // Удалить второй декор
        cy.get('.story-box-inner__wrapper img').its('length').should('eq', 1) // Проверка, что холсте остался один декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ QR-КОДА', function(){
        cy.visit('https://flyvi.io/app/designs/4844a9c9-798f-4531-8ca2-359225857341')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@system', {timeout:10000})
        cy.get('.story-box-inner__wrapper .decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(400)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@system', {timeout:10000})
        cy.get('.story-box-inner__wrapper img').its('length').should('eq', 2) // Проверка, что на холсте 2 декора
        cy.get('.story-box-inner__wrapper .decor-layer__inner').last().click()
        cy.barDelete() // Удалить второй декор
        cy.get('.story-box-inner__wrapper img').its('length').should('eq', 1) // Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ТАБЛИЦЫ', function(){
        cy.visit('https://flyvi.io/app/designs/074bae3a-6150-48f8-a96a-8c86cd809632')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner table').its('length').should('eq', 2) //Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Удалить').click() // Удалить второй декор
        cy.get('.decor-layer__inner table').its('length').should('eq', 1)// Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ССЫЛКИ', function(){
        cy.visit('https://flyvi.io/app/designs/80bb00dd-28a0-4b4d-a1d6-bdca95cf4be0')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2) // Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete() // Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1)//Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ РИСУНКА', function(){
        cy.visit('https://flyvi.io/app/designs/abc3b400-1a51-482e-ac33-c028c7aa0351')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner img').its('length').should('eq', 2) // Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete()// Удалить второй декор
        cy.get('.decor-layer__inner img').its('length').should('eq', 1) //Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ФИГУРЫ', function(){
        cy.visit('https://flyvi.io/app/designs/04ee346e-5a56-43a7-8970-9468fdd74f3a')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2) //Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete() //Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1)//Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ИЛЛЮСТРАЦИИ', function(){
        cy.visit('https://flyvi.io/app/designs/7f2b114e-648f-428f-aa4c-fc22da14dd4a')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2)// Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete() //Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1) //Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ИКОНКИ', function(){
        cy.visit('https://flyvi.io/app/designs/f6e383e3-f67c-4f97-9a9a-7ff0080ffd02')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2) //Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete() //Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1)// Проверка, что на хослсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ЭЛЕМЕНТА', function(){
        cy.visit('https://flyvi.io/app/designs/f3bd2638-c739-477a-b93b-9fbb3e243f16')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2)//Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete() //Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1)// Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ГИФКИ', function(){
        cy.visit('https://flyvi.io/app/designs/ea98a9bc-25e2-4be7-a303-4fded14d53e6')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2) //Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete()//Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1)// Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ АНИМАЦИИ', function(){
        cy.visit('https://flyvi.io/app/designs/8af22ac4-9f69-448f-8f95-da5b70d6dbfa')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2) //Провекра, что на хосте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete() //Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1) //Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ МАСКИ', function(){
        cy.visit('https://flyvi.io/app/designs/c91781a1-8557-4eaa-8c72-5098e0383729')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2) //Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete()//Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1)//Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ДИАГРАММЫ', function(){
        cy.visit('https://flyvi.io/app/designs/ca75da2a-0a5e-4451-951a-a96249cb2232')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2) //Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete()//Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1)//Проверка, что на холсте 1 декор
        cy.wait(300)
    })

    it('КОПИРОВАНИЕ ФОТО ИИ', ()=>{
        cy.visit('https://flyvi.io/app/designs/dc772ea3-e2c1-474f-ad4d-f74fb0240c1d')
        cy.intercept('GET', 'https://api.flyvi.io/api/fonts/by-brands').as('load')
        cy.get('.story-box-inner__wrapper').then((l)=>{
            if(l.find('.decor-layer').length > 1) {
                cy.get('.story-box-inner__wrapper .decor-layer').eq(1).click()
                cy.barDelete()
                cy.wait(200)
            } 
            else{}
          })
        cy.wait('@load', {timeout:10000})
        cy.get('.decor-layer__inner').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense')
        .contains('Дублировать').click() // Создать копию декора
        cy.wait(300)
        cy.reload()
        cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('texts')
        cy.wait('@texts', {timeout:10000})
        cy.get('.decor-layer__inner').its('length').should('eq', 2) //Проверка, что на холсте 2 декора
        cy.get('.decor-layer__inner').last().click()
        cy.barDelete()//Удалить второй декор
        cy.get('.decor-layer__inner').its('length').should('eq', 1)//Проверка, что на холсте 1 декор
        cy.wait(300)
    })
})