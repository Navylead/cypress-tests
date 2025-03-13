/// <reference types= "cypress" />

import { toInteger } from "lodash"

import Header from "../support/pageObjects/Header.js"
const header = new Header()
import Button from "../support/pageObjects/Button.js"
const button = new Button()
import Editor from "../support/pageObjects/Editor.js"
const editor = new Editor()

describe('Создание декоров', ()=>{
    beforeEach(()=>{
        cy.viewport(1920, 1080)
        cy.login3(Cypress.env('pMail2'), Cypress.env('pPass2'))     // Вход в акк 2
    }) 

    it('Добавить ТЕКСТ', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //Переход в раздел ТЕКСТЫ
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        cy.get('.flyvi-decors-drawer__menu_container').contains('Текст').click()         
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) {
                    attempt++          
                    cy.get('.content_iAKDM .flyvi-preview__decor__title').first().click()
                    cy.wait(1000)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
            // Клик по первому текстовому декор-тайпу в левом меню
        cy.get('.content_iAKDM .flyvi-preview__decor__title').first().click()
        retryAddDecor()
            // Проверка, что на холсте есть текстовый декор
        cy.contains('span', 'Добавьте заголовок').should('be.visible').click()
            // Удаление декора 
        editor.getDeleteButton().click() 
            // Проверка, что на холсте нет декора
        cy.contains('span', 'Добавьте заголовок').should('not.exist') // Проверка, что на холсте нет текста
        })
    

    it('Добавить АНСПЛЭШ', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //Переход в раздел МЕДИА - ФОТО
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        cy.get('.flyvi-decors-drawer__menu_container').contains('Медиа').click()
        // Клик по первому ФОТО в левом меню
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) {         
                    attempt++ 
                    cy.get('.container').eq(3).click()
                    cy.wait(1500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.container').eq(3).click()
        cy.wait(3000)
        retryAddDecor()
        // Проверка, что на холсте есть фото декор с корректным декор-тайпом
        cy.get('.preview-media').should('be.visible').then((dType)=>{
            expect(dType[0].dataset.decorType).to.eq('UNSPLASH')
        })
        // Удаление декора
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.preview-media').should('not.exist')
    })

    it('Добавить ПЕКСЕЛ',()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //Переход в раздел МЕДИА - ВИДЕО
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        cy.get('.flyvi-decors-drawer__menu_container').contains('Медиа').click()
        cy.get('.tabs-wrapper').contains('Видео').click()
        cy.wait(3000)
        // Клик по первому ВИДЕО в левом меню
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('#item_ELEMENT-1').click()
                    cy.wait(3000)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        retryAddDecor()
        // Проверка, что на холсте есть видео декор с корректной высотой
        editor.getDecor().should('be.visible').find('video').then((video)=>{
            expect(video.prop('clientHeight')).to.eq(386)
            expect(video.prop('clientWidth')).to.eq(771)
        })
        // Удаление декора
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('video.preview-media').should('not.exist')
    })

    it('Добавить АУДИО icon8', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.intercept('https://api.flyvi.io/api/icon8/popular/music').as('audio')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        cy.get('.flyvi-decors-drawer__menu_container').contains('Медиа').click() 
        cy.wait('@audio', {timeout:10000})
        cy.get('.tabs-wrapper').contains('Аудио').click() //Открыть раздел аудио
        // Клик по первому аудио в списке
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.design-footer').then((l)=>{
                if(l.find('.audios-wrapper').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('div[id="item_AUDIO-0"]').first().click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('div[id="item_AUDIO-0"]').first().click() 
        cy.wait(500)
        retryAddDecor()
        cy.get('.wrapper_yUa1C button').should('be.visible')//Проверка отображения декора на холсте
        cy.get('.wrapper_yUa1C button').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense').contains('Удалить').should('be.visible').click() //Удалить аудио
        cy.get('.wrapper_yUa1C button').should('not.exist') //Проверка, что декор удалён
    })

    it('Добавить АУДИО аплоад', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.intercept('.https://api.flyvi.io/api/decors-storage?type=UPLOADS&category[]=AUDIO&perPage=15&page=1').as('audio')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        cy.get('.flyvi-decors-drawer__menu_container').contains('Загрузки').click()
        cy.wait('@load', {timeout:10000})
        cy.get('@audio', {timeout:10000})
        cy.get('.tabs_5-b6l').contains('Аудио').click() //Открыть раздел аудио
        cy.wait(500)
        // Клик по первому аудио в списке
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.design-footer').then((l)=>{
                if(l.find('.audios-wrapper').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.audioList_KBpq9').first().click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.audioList_KBpq9').first().click()
        retryAddDecor() 
        cy.get('.wrapper_yUa1C button').should('be.visible') //Проверка отображения декора на холсте
        cy.get('.wrapper_yUa1C button').rightclick()
        cy.get('.v-list.v-sheet.theme--light.v-list--dense').contains('Удалить').should('be.visible').click() //Удалить аудио
        cy.get('.wrapper_yUa1C button').should('not.exist') //Проверка, что декор удалён
    })

    it('Добавить ФОТО аплоад', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЗАГРУЗКИ - ФОТО
        cy.get('.flyvi-decors-drawer__menu_container').contains('Загрузки').click()
        // Клик по ФОТО в левом меню
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.v-responsive__content').eq(1).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.v-responsive__content').eq(1).click()
        cy.wait(500)
        retryAddDecor()
        // Проверка, что на холсте есть фото декор с корректной высотой
        cy.get('.preview-media').should('be.visible').invoke('prop', 'naturalHeight').should('eq', 720)
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.preview-media').should('not.exist')
    })

    it('Добавить ВИДЕО аплоад', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЗАГРУЗКИ - ВИДЕО
        cy.get('.flyvi-decors-drawer__menu_container').contains('Загрузки').click()
        cy.get('.header_0ftvU').contains('Видео').click()
        //cy.wait('@load', {timeout:10000})
        // Клик по ВИДЕО в левом меню
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.preview_7ytBm').eq(0).click()
                    cy.wait(3000)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.preview_7ytBm').eq(0).click()
        cy.wait(2000)
        retryAddDecor()
        // Проверка, что на холсте есть видео декор с корректной высотой
        cy.get('video.preview-media').should('be.visible').then((video)=>{
            expect(video.prop('clientHeight')).to.be.greaterThan(0)
            expect(video.prop('clientWidth')).to.be.greaterThan(0)
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('video.preview-media').should('not.exist')
    })

    it('Добавить QR-код', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ВИДЖЕТЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Виджеты').click()
        //Добавить QR-код
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.wrapper_yjZQB .widgetWrapper_0V7P1').eq(1).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.wrapper_yjZQB .widgetWrapper_0V7P1').eq(1).click()
        cy.wait(500)
        retryAddDecor()
        cy.get('.toolbar_C5Vp-').contains('Готово').click()
        // Проверка, что на холсте есть QR-код
        cy.get('img.flyvi-render-decor.flyvi-render-decor_drawing').should('be.visible').then((qr)=>{
            expect(qr.prop('clientHeight')).to.eq(324)
            expect(qr.prop('src')).to.contain('qr-codes')
        })
        // Удаление декора
        cy.get('img.flyvi-render-decor.flyvi-render-decor_drawing').click() 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('img.flyvi-render-decor.flyvi-render-decor_drawing').should('not.exist')
    })

    it('Добавить ТАБЛИЦУ', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЭЛЕМЕНТЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.drawer-mixin').scrollTo('bottom')
        cy.contains('Таблицы').click()
        //Добавить ТАБЛИЦУ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.drawerList_VLnzD .previewWrapper_oHc8P').eq(1).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.drawerList_VLnzD .previewWrapper_oHc8P').eq(1).click()
        retryAddDecor()
        // Проверка, что на холсте появилась таблица
        cy.get('.table-decor').should('be.visible').then((table)=>{
            expect(table.prop('clientHeight')).to.eq(540)
            expect(table.prop('tagName')).to.eq('TABLE')
        })
        // Удаление декора
        cy.get('.table-decor').click() 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.table-decor').should('not.exist')
    })

    it('Добавить ССЫЛКУ', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //cy.wait('@load', {timeout:10000})
        //Переход в раздел ВИДЖЕТЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Виджеты').click()
        //Добавить ССЫЛКУ
        let attempt = 0
        const maxAttempt = 7
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.content_iAKDM').contains('Ссылка').click()
                    cy.wait(600)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.content_iAKDM').contains('Ссылка').click()
        retryAddDecor()
        // Проверка, что на холсте есть кнопка
        cy.get('.flyvi-decor__button-render').should('be.visible').then((link)=>{
            expect(link.text().trim()).to.eq('Название кнопки')
            expect(link.prop('clientHeight')).to.eq(162)
            expect(link.prop('clientWidth')).to.eq(540)
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.flyvi-decor__button-render').should('not.exist')
    })

    it('Добавить ФИГУРУ', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЭЛЕМЕНТЫ - ФИГУРЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.drawerType_VkIy4').contains('Элементы').click()
        cy.contains('Фигуры').click()
        //Добавить ФИГУРУ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('[style=""] > .category_Wh3UH > #drawer-list > .categoryList_GdvW3 > #item_ELEMENT-0 > .container_fMJpm > .preview_PQ-LB > .previewWrapper_mCQGy').click()
                    cy.get('.story-box-inner__wrapper').click('center')
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('[style=""] > .category_Wh3UH > #drawer-list > .categoryList_GdvW3 > #item_ELEMENT-0 > .container_fMJpm > .preview_PQ-LB > .previewWrapper_mCQGy').click()
        cy.get('.story-box-inner__wrapper').click('center')
        retryAddDecor()
        // Проверка, что на холсте есть Фигура
        cy.get('.story-box-inner__wrapper polygon').should('be.visible').then((fig)=>{
            expect(fig.prop('tagName')).to.eq('polygon')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper polygon').should('not.exist')
    })

    it('Добавить ФИГУРУ 2.0', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЭЛЕМЕНТЫ - ФИГУРЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.drawer-mixin rect').should('be.visible')
        cy.contains('Фигуры').click()
        //Добавить ФИГУРУ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.list_dWGep').find('.previewWrapper_4SAoJ').eq(2).click()
                    cy.get('.story-box-inner__wrapper').click('center')
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.list_dWGep').find('.previewWrapper_4SAoJ').eq(2).click()
        cy.get('.story-box-inner__wrapper').click('center')
        retryAddDecor()
        // Проверка, что на холсте есть Фигура
        cy.get('.story-box-inner__wrapper .decor-layer__inner').should('be.visible').then((fig)=>{
            expect(fig.prop('tagName')).to.eq('DIV')
            expect(fig.prop('clientHeight')).to.eq(270)
            expect(fig.prop('clientWidth')).to.eq(270)
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper .decor-layer__inner').should('not.exist')
    })

    it('Добавить СТИКЕР', ()=>{
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЭЛЕМЕНТЫ - СТИКЕРЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.contains('Стикеры').click()
        //Добавить СТИКЕР
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.previewList_3cbBX').find('.previewWrapper_VQlnm').eq(0).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.previewList_3cbBX').find('.previewWrapper_VQlnm').eq(0).click()
        retryAddDecor()
        // Проверка, что на холсте есть СТИКЕР
        // cy.get('.story-box-inner__wrapper .decor-layer__inner').invoke('attr', 'data-decor-type').should('contain', 'STICKER')
        cy.get('.story-box-inner__wrapper .decor-layer__inner').should('be.visible').then((fig)=>{
            expect(fig[0].clientHeight).to.eq(360)
            expect(fig[0].clientWidth).to.eq(360)
            expect(fig[0].attributes[2].value).to.eq('STICKER')
            expect(fig.attr('data-decor-type')).to.eq('STICKER')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper .decor-layer__inner').should('not.exist')
    })

    it('Добавить ИЛЛЮСТРАЦИЮ', function() {
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //cy.intercept('https://api.flyvi.io/api/folders?page=1&perPage=15').as('folder')
        //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //cy.wait('@folder', {timeout:10000})
        //Переход в раздел ЭЛЕМЕНТЫ - ИЛЛЮСТРАЦИИ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.contains('Иллюстрации').click()
        // Дождаться, пока загрузится страница полностью
        //cy.wait('@load')
        //Добавить ИЛЛЮСТРАЦИЮ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.slick-track.slick-center').eq(0).find('.v-responsive__content').eq(0).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.slick-track.slick-center').eq(0).find('.v-responsive__content').eq(0).click()
        retryAddDecor()
        // Проверка, что на холсте есть Иллюстрация
        cy.get('.story-box-inner__wrapper img').should('be.visible').then((ilst)=>{
            expect(ilst.prop('clientHeight')).to.be.greaterThan(0)
            expect(ilst.prop('clientWidth')).to.be.greaterThan(0)
            expect(ilst.prop('src')).to.contain('icons8.com/')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper img').should('not.exist')
    })

    it('Добавить ИКОНКУ', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //cy.intercept('https://api.flyvi.io/api/folders?page=1&perPage=15').as('folder')
        //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //cy.wait('@folder', {timeout:10000})
        //Переход в раздел ЭЛЕМЕНТЫ - ИКОНКИ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.contains('Иконки').click()
        // Дождаться, пока загрузится страница полностью
        //cy.wait('@load')
        //Добавить ИКОНКУ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.slick-track.slick-center').eq(0).find('.v-responsive__content').eq(0).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.slick-track.slick-center').eq(0).find('.v-responsive__content').eq(0).click()
        retryAddDecor()
        // Проверка, что на холсте есть Иконка
        cy.get('.story-box-inner__wrapper img').should('be.visible').then((ico)=>{
            expect(ico.prop('clientHeight')).to.be.greaterThan(0)
            expect(ico.prop('clientWidth')).to.be.greaterThan(0)
            expect(ico.prop('src')).to.contain('/decors-types/icon8-icons')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper img').should('not.exist')
    })

    it('Добавить ЭЛЕМЕНТ', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //cy.wait('@load', {timeout:10000})
        //Переход в раздел ЭЛЕМЕНТЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.category_Wh3UH').contains('Элементы').click()
        //Добавить ЭЛЕМЕНТ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.category_Wh3UH').eq(4).find('.v-responsive__content').eq(0).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.category_Wh3UH').eq(4).find('.v-responsive__content').eq(0).click()
        retryAddDecor()
        // Проверка, что на холсте есть Элемент
        cy.get('.story-box-inner__wrapper img').should('be.visible').then((elem)=>{
            expect(elem.prop('clientHeight')).to.be.greaterThan(0)
            expect(elem.prop('clientWidth')).to.be.greaterThan(0)
            expect(elem.prop('src')).to.contain('/decors-types/elements/')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper img').should('not.exist')
    })

    it('Добавить ГИФКИ', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //cy.wait('@load', {timeout:10000})
        //Переход в раздел ЭЛЕМЕНТЫ - ГИФКИ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.category_Wh3UH').contains('Гифки').click()
        //Добавить ГИФКУ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.v-responsive__content').eq(3).click({force:true})
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.v-responsive__content').eq(3).click({force:true})
        retryAddDecor()
        // Проверка, что на холсте есть Гифка
        cy.get('.story-box-inner__wrapper img')
        .should('be.visible').invoke('prop', 'height')
        .should('be.greaterThan', 0,) 
        cy.get('.story-box-inner__wrapper img').then((gif)=> {
            expect(gif.prop('height')).to.be.greaterThan(0)
            expect(gif.prop('width')).to.be.greaterThan(0)
        })
        
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper img').should('not.exist')
    })

    it('Добавить АНИМАЦИИ', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389738')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЭЛЕМЕНТЫ - АНИМАЦИИ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.category_Wh3UH').contains('Анимации').click()
        //Добавить АНИМАЦИЮ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.v-responsive__content').eq(0).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.v-responsive__content').eq(0).click()
        cy.wait(300)
        retryAddDecor()
        // Проверка, что на холсте есть Анимация
        cy.get('.story-box-inner__wrapper svg').should('be.visible').then((anim)=>{
            expect(anim.prop('clientHeight')).to.be.greaterThan(0)
            expect(anim.prop('clientWidth')).to.be.greaterThan(0)
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper svg').should('not.exist')
    })

    it('Добавить МАСКУ', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел МАСКИ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Маски').click()
        //Добавить МАСКУ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.v-responsive__content').eq(3).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.v-responsive__content').eq(3).click()
        retryAddDecor()
        // Проверка, что на холсте есть Маска
        cy.get('.story-box-inner__wrapper .wrapper-mask').should('be.visible').then((mask)=>{
            expect(mask.prop('clientHeight')).to.be.greaterThan(0)
            expect(mask.prop('clientWidth')).to.be.greaterThan(0)
            expect(mask[0].dataset.decorType).to.eq('MASK')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper .wrapper-mask').should('not.exist')
    })

    it('Добавить ДИАГРАММУ', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЭЛЕМЕНТЫ - ДИАГРАММЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.category_Wh3UH').contains('Графики').click()
        cy.get('.list_CRXSf').contains('Круговые').click()
        //Добавить ДИАГРАММУ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.categoryList_GdvW3.itemInRow-3_TW6HV').find('.v-responsive__content').eq(0).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.categoryList_GdvW3.itemInRow-3_TW6HV').find('.v-responsive__content').eq(0).click()
        retryAddDecor()
        // Проверка, что на холсте есть Диаграмма
        cy.get('.story-box-inner__wrapper canvas').should('be.visible').should(chart=>{
            expect(chart.prop('height')).to.eq(540)
            expect(chart.prop('width')).to.eq(626)
            expect(chart.prop('tagName')).to.eq('CANVAS')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper .decor-layer').should('not.exist')
    })

    it('Добавить ПИКТОГРАММУ', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //cy.wait('@load', {timeout:15000})
        //Переход в раздел ЭЛЕМЕНТЫ - ПИКТОГРАММЫ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.category_Wh3UH').contains('Графики').click()
        cy.get('.list_CRXSf').contains('Пиктограммы').click()
        //Добавить ПИКТОГРАММУ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.categoryList_GdvW3.itemInRow-3_TW6HV').find('.v-responsive__content').eq(0).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.categoryList_GdvW3.itemInRow-3_TW6HV').find('.v-responsive__content').eq(0).click()
        cy.wait(300)
        retryAddDecor()
        // Проверка, что на холсте есть Пиктограмма
        editor.getDecor().should((chart)=> {
            expect(chart.prop('clientHeight')).to.eq(194)
            expect(chart.prop('clientWidth')).to.eq(540)
            expect(chart.prop('tagName')).to.eq('DIV')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper .decor-layer').should('not.exist')
    })

    it('Добавить РИСУНОК', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //cy.wait('@load', {timeout:10000})
        //Переход в раздел ВИДЖЕТЫ - РИСУНОК
        cy.get('.flyvi-decors-drawer__menu_container').contains('Виджеты').click()
        //Добавить Рисунок
        cy.get('.content_iAKDM').contains('Рисование').click()
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.story-box-inner__wrapper').click('center')
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.story-box-inner__wrapper').click('center')
        cy.wait(500)
        retryAddDecor()
        cy.get('.addPanel_KUDr7').contains('Готово').click()
        // Проверка, что на холсте есть Рисунок
        cy.get('.story-box-inner__wrapper img').should('be.visible').then((draw)=>{
            expect(draw.prop('outerHTML')).to.contain('drawing')
        })
        // Удаление декора 
        cy.decor().click()
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper img').should('not.exist')
    })

    it('Добавить ЛИНИЮ', function(){
        cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-09a0389735')
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        //Переход в раздел ЭЛЕМЕНТЫ - ЛИНИИ
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').click()
        cy.get('.drawer-mixin rect').should('be.visible')
        cy.get('.category_Wh3UH').contains('Фигуры').click()
        //Добавить ЛИНИЮ
        let attempt = 0
        const maxAttempt = 5
        const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.list_dWGep').find('.preview_Ow701').eq(1).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
        cy.get('.list_dWGep').find('.preview_Ow701').eq(1).click()
        retryAddDecor()
        // Проверка, что на холсте есть Линия
        cy.get('.story-box-inner__wrapper .decor-layer__inner').should((chart)=> {
            expect(chart.prop('clientHeight')).to.eq(5)
            expect(chart.prop('clientWidth')).to.eq(270)
            expect(chart.attr('data-decor-type')).to.eq('LINE')
        })
        // Удаление декора 
        editor.getDeleteButton().click()
        // Проверка, что на холсте нет декора
        cy.get('.story-box-inner__wrapper .decor-layer').should('not.exist')
    })

})