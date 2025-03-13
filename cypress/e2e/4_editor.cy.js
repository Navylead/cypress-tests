/// <reference types= "cypress" />

import Header from "../support/pageObjects/Header.js"
const header = new Header()
import Button from "../support/pageObjects/Button.js"
const button = new Button()
import Editor from "../support/pageObjects/Editor.js"
const editor = new Editor()


describe('ЭДИТОР', () => {

    beforeEach(()=>{
      cy.viewport(1920, 1080)
      cy.login3(Cypress.env('pMail'), Cypress.env('pPass'))
    })  
    
      it('ЭДИТОР. Поиск по Шаблонам', ()=>{
        cy.intercept('**/api/folders/get-content?itemType=DECOR-TYPE&type=TEMPLATE&perPage=4*').as('load')
        cy.intercept('**/templates?page=1&perPage=50*').as('templates')
        cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
        cy.url().should('include', '/2a24881a-930d-4a11-a034-969632f9e74c')
        cy.wait('@load', {timeout:15000})
        cy.get('.header_0ftvU input').should('be.visible').type('реклама{enter}') // Ввод запроса
        cy.wait('@templates', {timeout:10000}).then((resp)=>{
          expect(resp.response.body.meta.last_page).to.be.greaterThan(0) // Страниц поиска больше 0
          expect(resp.response.body.meta.total).to.be.greaterThan(100)   // Найденных шаблонов больше 0
        })
        cy.get('.v-responsive__content').should('be.visible').its('length').should('be.greaterThan', 5)
    })

      it('ЭДИТОР. Поиск по Ансплэш', ()=>{
        cy.intercept('**/unsplash/search/photos?q*').as('unsp')
        cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
        cy.url().should('include', '/2a24881a-930d-4a11-a034-969632f9e74c')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Медиа').should('be.visible').click()
        cy.get('[placeholder="Поиск фотографий"]').should('be.visible').type('осень')  // Ввод запроса
        cy.wait('@unsp').then((unsp)=>{
          expect((unsp.response.body).length).to.eq(30) // В первой странице поиска 30 фото
        })
        cy.get('.v-responsive__content').should('be.visible').its('length').should('be.greaterThan', 5)
      })
  
      it('ЭДИТОР. Поиск по Пекселс', ()=>{
          cy.intercept('**/api/pexels/search/videos?q*').as('pexels')
          cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
          cy.url().should('include', '/2a24881a-930d-4a11-a034-969632f9e74c')
          cy.contains('Медиа').should('be.visible').click()
          cy.get('.tabs-wrapper').contains('button', 'Видео').click()
          cy.get('[placeholder="Поиск видео"]').should('be.visible').type('fall') // Ввод запроса
          cy.wait('@pexels').then((pex)=>{
            expect((pex.response.body).length).to.eq(15) // В первой странице поиска 15 видео
          })
          cy.get('.v-responsive__content').should('be.visible').its('length').should('be.greaterThan', 5)
        })

      it('ЭДИТОР. Поиск по АУДИО', ()=>{
          cy.intercept('**/api/icon8/search/music?q*').as('music')
          cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
          cy.url().should('include', '/2a24881a-930d-4a11-a034-969632f9e74c')
          cy.contains('Медиа').should('be.visible').click()
          cy.get('.tabs-wrapper').contains('button', 'Аудио').click()
          cy.get('[placeholder="Поиск аудио"]').should('be.visible').type('magic') // Ввод запроса
          cy.wait('@music').then((mus)=>{
            expect((mus.response.body).length).to.eq(15) // В первой странице поиска 15 аудио
          })
          cy.get('.audioList_Uw3TR').should('be.visible').its('length').should('be.greaterThan', 5)
          cy.get('.audioList_Uw3TR').should('contain', 'Magic')
        })

      it('ЭДИТОР. Поиск по GIF', ()=>{
          cy.intercept('https://api.giphy.com/v1/stickers/trending?limit=40*').as('gif')
          cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
          cy.url().should('include', '/2a24881a-930d-4a11-a034-969632f9e74c')
          cy.contains('Элементы').should('be.visible').click()
          cy.get('.drawer-mixin').contains('Гифки').click()
          cy.get('[placeholder="Поиск гифок"]').should('be.visible').type('ball') // Ввод запроса
          cy.wait('@gif').then((gif)=>{
            expect(gif.response.body.pagination.count).to.eq(40) // В первой странице поиска 40 GIF
            expect(gif.response.body.pagination.total_count).to.be.greaterThan(0)
          })
          cy.get('.v-responsive__content').should('be.visible').its('length').should('be.greaterThan', 5)
        })

      it('ЭДИТОР. Поиск по ИКОНКАМ', ()=>{
          cy.intercept('https://api.flyvi.io/api/icon8/search/icon?q=*').as('icon')
          cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
          cy.url().should('include', '/2a24881a-930d-4a11-a034-969632f9e74c')
          cy.contains('Элементы').should('be.visible').click()
          cy.get('.drawer-mixin').contains('Иконки').click()
          cy.get('[placeholder="Поиск иконок"]').should('be.visible').type('дом') // Ввод запроса
          cy.wait('@icon').then((icon)=>{
            expect((icon.response.body).length).to.eq(15) // В первой странице поиска 15 иконок
          })
          cy.get('.v-responsive__content', {timeout:20000}).should('be.visible').its('length').should('be.greaterThan', 5)
        })

      it('ЭДИТОР. Поиск по ИЛЮСТРАЦИЯМ', ()=>{
          cy.intercept('https://api.flyvi.io/api/icon8/search/vector?q=*').as('vec')
          cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
          cy.url().should('include', '/2a24881a-930d-4a11-a034-969632f9e74c')
          cy.contains('Элементы').should('be.visible').click()
          cy.get('.drawer-mixin').contains('Иллюстрации').click()
          cy.get('[placeholder="Поиск иконок"]').should('be.visible').type('персонажи') // Ввод запроса
          cy.wait('@vec').should((vec)=>{
            expect((vec.response.body).length).to.eq(15) // В первой странице поиска 15 иллюстраций
          })
          cy.get('.v-responsive__content').should('be.visible').its('length').should('be.greaterThan', 5)
        })

      it('ЭДИТОР. Удаление фона у фото АПЛОАД', ()=>{
          cy.visit('https://flyvi.io/app/designs/6049d6c3-a5fe-44da-84c2-1f31749ae2')
          cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
          cy.get('.flyvi-decors-drawer__menu_container').contains('Загрузки').click() //Открыть загрузки
          //Клик по первому аплоад фото
          let attempt = 0
          const maxAttempt = 5
          const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.v-responsive__content').first().click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
          }
          cy.get('.v-responsive__content').first().click()
          retryAddDecor() 
          cy.get('.decor-layer__inner').click() //Клик по этому фото на холсте
          cy.get('.design-main-toolbar').contains('Удалить фон').click() //Удаление фона
          cy.get('.decor-layer__inner img').invoke('prop', 'src').should('include', '-no-bg') //Проверка, что в ссылке на фото есть "no-bg"
          editor.getDecor().click()
          editor.getDeleteButton().click() // Удаление фото с холста
        })

      it('ЭДИТОР. Удаление фона у фото АНСПЛЭШ', ()=>{
          cy.visit('https://flyvi.io/app/designs/6049d6c3-a5fe-44da-84c2-1f31749ae2')
          //cy.intercept('https://api.flyvi.io/api/designs/2678534/comments').as('load')
          cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
          cy.get('.flyvi-decors-drawer__menu_container').contains('Медиа').click()
          //cy.wait('@load', {timeout:10000})
          // Клик по первому ФОТО в левом меню
          let attempt = 0
          const maxAttempt = 5
          const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.container').eq(1).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
          }
          cy.get('.container').eq(1).click()
          retryAddDecor()
          cy.get('.design-main-toolbar').contains('Удалить фон').click() //Удаление фона
          //cy.wait(1000)
          cy.get('.decor-layer__inner img')
          .invoke('prop', 'src')
          .should('include', '-no-bg') //Проверка, что в ссылке на фото есть "no-bg"
          editor.getDecor().click()
          editor.getDeleteButton().click() // Удаление фото с холста
        })

      it('ЭДИТОР. Удаление фона у фото ИИ',()=>{                                  
          cy.visit('https://flyvi.io/app/designs/6049d6c3-a5fe-44da-84c2-1f31749ae2')
          cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
          cy.get('.flyvi-decors-drawer__menu_container').contains('ИИ-мастерская').click() //Переход в меню фото ИИ
          cy.get('.tabs_5-b6l').contains('Мои картинки').click() //Переход на вкладку с созданными фото
          // Добавить фото ИИ на холст
          let attempt = 0
          const maxAttempt = 5
          const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.columns_3478Y .v-responsive__sizer').eq(0).click({force:true}) 
                    cy.wait(800)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
          }
          cy.get('.columns_3478Y .v-responsive__sizer').eq(0).click({force:true})
          retryAddDecor() 
          cy.get('.design-main-toolbar').contains('Удалить фон').click() //Удаление фона
          cy.get('.decor-layer__inner img')
          .invoke('prop', 'src')
          .should('include', '-no-bg') //Проверка, что в ссылке на фото есть "no-bg"
          editor.getDecor().click()
          editor.getDeleteButton().click() // Удаление фото с холста
        })

      it('ЭДИТОР. Добавить Фильтр и Эффект на фото АПЛОАД', function(){
          cy.visit('https://flyvi.io/app/designs/6049d6c3-a5fe-44da-84c2-1f31749ae2')
          cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
          cy.get('.flyvi-decors-drawer__menu_container').contains('Загрузки').click() //Открыть загрузки
          //Клик по первому аплоад фото
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
          cy.get('.v-responsive__content').first().click()
          retryAddDecor()
          cy.get('.design-main-toolbar').contains('button', 'Фильтры').click() //Клик ФИЛЬТРАМ в тулбаре
          cy.get('.filterWrapper_-ddIG').contains('Street').click() //Клик по фильтру STREET
          cy.get('.design-main-toolbar').contains('button', 'Эффекты').click() //Клик ЭФФЕКТАМ в тулбаре
          cy.get('.drawerType_VkIy4 .effectWrapper_sXRYj').eq(1).click() //Клик по эффекту ОБВОДКА
          cy.get('.story-box__decors .decor-layer').should((line)=>{
            let cls = line.attr('style')
            expect(cls).to.contain("outline:")}) //Проверка, что ОБВОДКА добавлена
          cy.get('.decor-layer__inner img').should((filter)=>{
            expect(filter[0].style.filter).to.contain('#filter-temp__')}) //Проверка, что ФИЛЬТР добавлен
          editor.getDeleteButton().click() // Удаление фото с холста
        })

      it('ЭДИТОР. Добавить Фильтр и Эффект на фото АНСПЛЭШ', function(){
          cy.visit('https://flyvi.io/app/designs/6049d6c3-a5fe-44da-84c2-1f31749ae2')
          cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
          cy.get('.flyvi-decors-drawer__menu_container').contains('Медиа').click()
          // Клик по первому ФОТО в левом меню
          let attempt = 0
          const maxAttempt = 5
          const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.container').eq(1).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
          cy.get('.container').eq(1).click()
          retryAddDecor()
          cy.get('.design-main-toolbar').contains('button', 'Фильтры').click() //Клик ФИЛЬТРАМ в тулбаре
          cy.get('.filterWrapper_-ddIG').contains('Street').click() //Клик по фильтру STREET
          cy.get('.design-main-toolbar').contains('button', 'Эффекты').click() //Клик ЭФФЕКТАМ в тулбаре
          cy.get('.drawerType_VkIy4 .effectWrapper_sXRYj').eq(1).click() //Клик по эффекту ОБВОДКА
          cy.get('.story-box__decors .decor-layer').should((line)=>{
            let cls = line.attr('style')
            expect(cls).to.contain("outline:")}) //Проверка, что ОБВОДКА добавлена
          cy.get('.decor-layer__inner img').should((filter)=>{
            expect(filter[0].style.filter).to.contain('#filter-temp__')}) //Проверка, что ФИЛЬТР добавлен
          editor.getDeleteButton().click() // Удаление фото с холста
        })

      it('ЭДИТОР. Применить фигурную ОБРЕЗКУ к фото АПЛОАД', function(){
          cy.visit('https://flyvi.io/app/designs/6049d6c3-a5fe-44da-84c2-1f31749ae2')
          cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
          cy.get('.flyvi-decors-drawer__menu_container').contains('Загрузки').click() //Открыть загрузки
          //Клик по первому аплоад фото
          let attempt = 0
          const maxAttempt = 5
          const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.v-responsive__content').first().click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
          cy.get('.v-responsive__content').first().click()
          retryAddDecor() 
          cy.get('.design-main-toolbar').contains('button', 'Обрезка').click() // Переход в меню обрезки
          cy.get('.brushWrapper_zE9SF').eq(13).click() // Клик по обрезке ЗВЕЗДА
          cy.get('.design-main-toolbar').contains('button', 'Готово').click()
          //Проверка, что обрезка применилась
          cy.get('.decor-layer__inner img').should((crop)=>{
            expect(crop[0].style.clipPath).to.eq('polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)')})
          editor.getDeleteButton().click() // Удаление фото с холста 
        })

      it('ЭДИТОР. Применить фигурную ОБРЕЗКУ к фото АНСПЛЭШ', function(){
          cy.visit('https://flyvi.io/app/designs/6049d6c3-a5fe-44da-84c2-1f3174ae2')
          //cy.intercept('**/api/designs/470305/comments').as('load')
          cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
          cy.get('.flyvi-decors-drawer__menu_container').contains('Медиа').click()
          //cy.wait('@load', {timeout:10000})
          // Клик по первому ФОТО в левом меню
          let attempt = 0
          const maxAttempt = 5
          const retryAddDecor = () => {
            cy.get('.story-box-inner__wrapper').then((l)=>{
                if(l.find('.decor-layer').length < 1 && attempt < maxAttempt) { 
                    attempt++         
                    cy.get('.container').eq(1).click()
                    cy.wait(500)
                    retryAddDecor();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК ДОБАВИТЬ ДЕКОР>>>')
                }})
        }
          cy.get('.container').eq(1).click()
          retryAddDecor()
          cy.get('.design-main-toolbar').contains('button', 'Обрезка').click() // Переход в меню обрезки
          cy.get('.brushWrapper_zE9SF').eq(16).click() // Клик по обрезке РАМКА
          cy.get('.design-main-toolbar').contains('button', 'Готово').click()
          //Проверка, что обрезка применилась
          cy.get('.decor-layer__inner img').should((crop)=>{
            expect(crop[0].style.clipPath).to.eq("polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)")})
          editor.getDeleteButton().click() // Удаление фото с холста 
        })

      it('ЭДИТОР. СЛУЧАЙНЫЙ ШАБЛОН', ()=>{
        let backgroundOld // Фон дизайна до применения случайного шаблона
        let backgroundNew // Фон дизайна после применения шаблона
        cy.intercept('**/api/folders/get-content?itemType=DECOR-TYPE&type=TEMPLATE*').as('templates')
        cy.visit('https://flyvi.io/app/designs/892617f4-7acf-4e1b-add3-adfcaa62e7')
        cy.url().should('include', '/892617f4-7acf-4e1b-add3-adfcaa62e753')
        cy.title().should('eq', 'RANDOM | Flyvi')
        cy.get('.page-header-wrapper').should('contain', 'Страница 1')
        cy.get('.flyvi-decor-background-wrapper').then(($dk)=>{
              backgroundOld = $dk.attr('data-key')
        })
        cy.wait('@templates', {timeout:10000})
        cy.get('.category_Wh3UH').eq(0).find('.v-image__image.v-image__image--cover').should('be.visible') // Проверка, что загрузились шаблоны
        cy.get('.random-template-btn').click()         // Клик по случайном шаблону
        cy.get('.flyvi-decor-background-wrapper').should(($dk)=>{
          backgroundNew = $dk.attr('data-key')
          expect(backgroundOld).not.eq(backgroundNew) // Сравнение атрибутов "data-key" до и после рандомного шиблона
          })
        })

      it('ЭДИТОР. ИЗМЕНЕНИЕ РАЗМЕРА ДИЗАЙНА', ()=>{
          const size = "1" + Math.floor(Math.random()*1000)
          cy.visit('https://flyvi.io/app/designs/0c0837e6-e171-4e09-b590-45d3554a4d')
          cy.get('.story-box__decors').invoke('prop', 'clientWidth').then((x)=>{
            const oldWeidth = x
            expect(oldWeidth).to.be.greaterThan(0)
            cy.get('.header-actions-wrapper').contains('button', 'Изменить размер').should('be.visible').click()
            cy.get('.change-size-actions').contains('button', 'Настраиваемый размер').should('be.visible').click()
            cy.get('div.fields-custom-design').find('input').eq(0).clear().type(size)
            cy.get('.change-size-actions').contains('button', 'Изменить').should('be.visible').click()
            cy.get('.story-box__decors').invoke('prop', 'clientWidth').should((x)=>{
              const newWeidth = x
              expect(oldWeidth).to.not.eq(newWeidth) 
            })
          })
        })

      it('ЭДИТОР. Смена цвета ФОНА через hex-код', function(){
          cy.visit('https://flyvi.io/app/designs/16d14ee9-5727-41ac-802c-dcb3f753ed')
          cy.get('._3odeXg.h2sRaA').contains('Фоны').click()       // Переход в раздел ФОНЫ
          cy.get('.tabs_5-b6l').contains('button', 'Цвет').click() //Вкладка ЦВЕТ
          cy.get('.colorItem_goGoU.dark_UvJHW').eq(5).should('be.visible')
          cy.get('.input-container input').clear().type('#8EFFBE') // Вставка hex-кода цвета
          cy.get('.input-container input').click()
          editor.canvas().click('top')          // Применить САЛАТОВЫЙ ЦВЕТ
          cy.get('.flyvi-decor-background').should((brnd)=>{
            expect(brnd[0].style.backgroundColor).to.eq("rgb(142, 255, 190)")}) //Проверка, что цвет применился к ФОНУ
        })

      it.skip('ЭДИТОР. Смена цвета ФОНА через готовые цвета', function(){
        const randomNumber = Math.floor(Math.random() * 21) // Рандомное число, чтобы выбрать случайный цвет из готовых
        let oldColor
        let newColor
        cy.visit('https://flyvi.io/app/designs/16d14ee9-5727-41ac-802c-dcb3f753e0')
        cy.get('.flyvi-decor-background').should((bnd)=>{
          oldColor = bnd[0].style.backgroundColor})               // Старый цвет фона
        cy.get('._3odeXg.h2sRaA').contains('Фоны').click()        // Переход в раздел ФОНЫ
        cy.get('.tabs_5-b6l').contains('button', 'Цвет').click()  // Вкладка ЦВЕТ
        cy.get('.colorItem_goGoU.dark_UvJHW').eq(randomNumber).should('be.visible')
        cy.get('.colorItem_goGoU.dark_UvJHW').eq(randomNumber).click() 
        cy.get('.colorItem_goGoU.dark_UvJHW.darkActive_JgHMA').click() // Применить ГОТОВЫЙ ЦВЕТ
        cy.get('.flyvi-decor-background').should((bnd)=>{
          newColor = bnd[0].style.backgroundColor // Новый цвет фона
          expect(oldColor).to.not.eq(newColor)}) //Проверка, что цвет применился к ФОНУ
      })

      it.skip('ЭДИТОР. Смена цвета ТЕКСТА через hex-код',()=>{
          cy.visit('https://flyvi.io/app/designs/c0f4c065-929f-4dad-8905-16ab940372')
          cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('load')
          editor.getDecor().then((text)=>{
            expect(text.prop('innerText')).to.eq('Добавьте заголовок')
            expect(text.prop('outerHTML')).not.to.contain('#FFDE59FF')
          })
          cy.wait('@load')
          editor.getDecor().click()
          cy.get('.page-comment').click() 
          cy.wait(500)
          cy.get('.addPanel_vm4Bi .toolbarItem_cBSkN').eq(3).find('button').click()
          cy.get('.v-color-picker__input input').type('{selectALL}#FFDE59FF{enter}') // #FFDE59FF
          cy.wait(1000)
          cy.reload()
          editor.getDecor().then((text)=>{
            expect(text.prop('innerText')).to.eq('Добавьте заголовок')
            expect(text.prop('outerHTML')).to.contain('#FFDE59FF')
          })
        })

      it.skip('ЭДИТОР. Смена цвета ТЕКСТА через готовые цвета',()=>{
          cy.visit('https://flyvi.io/app/designs/c0f4c065-929f-4dad-8905-16ab940372')
          cy.intercept('https://api.flyvi.io/api/fonts/by-brands').as('load')
          editor.getDecor().then((text)=>{
            expect(text.prop('innerText')).to.eq('Добавьте заголовок')
            expect(text.prop('outerHTML')).not.to.contain('#a6a6a6ff')
          })
          cy.wait('@load')
          editor.getDecor().click()
          cy.get('.page-comment').click() 
          cy.get('.addPanel_vm4Bi .toolbarItem_cBSkN').eq(3).find('button').click()
          cy.wait(500)
          cy.get('.colorsSet_fEKmq .colorItem_goGoU').eq(7).click()
          cy.wait(500)
          cy.reload()
          editor.getDecor().then((text)=>{
            expect(text.prop('innerText')).to.eq('Добавьте заголовок')
            expect(text.prop('outerHTML')).to.contain('#a6a6a6ff')
          })
        })

      it.skip('ЭДИТОР. Смена цвета ФИГУРЫ через hex-код', function(){
          cy.visit('https://flyvi.io/app/designs/b3e8e8d3-c808-49df-b74f-9abb3dcc35')
          editor.getDownloadButton().should('be.visible')
          cy.get('.story-box-inner__wrapper .decor-layer polygon').then((fig)=>{
            //expect(fig.prop('outerHTML')).not.to.contain('#FFDE59FF')
          })
          editor.getDecor().rightclick()
          cy.get('.toolbarItem_cBSkN').find('button').eq(0).click()
          cy.get('.v-color-picker__input input').type('{selectALL}#FFDE59FF') // #FFDE59FF
          cy.get('.story-box-inner__wrapper').click('top')
          cy.wait(500)
          cy.reload()
          cy.get('.story-box-inner__wrapper .decor-layer polygon').then((fig)=>{
            expect(fig.prop('outerHTML')).to.contain('#FFDE59FF')
          })
        })

        it('ЭДИТОР. ПРИМЕНИТЬ ОТОБРАЖЕНИЕ ДЛЯ ДЕКОРА', ()=>{
          let transform // Эффект ОТОБРАЖЕНИЕ для декора
          cy.visit('https://flyvi.io/app/designs/2d02d1a7-c752-48f6-8440-0938973588')
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
          // Проверка, что на холсте есть декор
          editor.getDecor().should('be.visible')
          // Применить ОТОБРАЖЕНИЕ ПО ВЕРТИКАЛИ
          cy.get('.design-main-toolbar').contains('button', 'Отобразить').should('be.visible').click() // Проверка видимости кнопки ОТОБРАЗИТЬ
          cy.contains('button', 'По вертикали').should('be.visible').click() // Применить ОТОБРАЖЕНИЕ
          editor.getDecor().find('img').should((disp)=>{
            transform = disp[0].style.transform
            expect(transform).to.eq("scale(1, -1)") // Проверка, что применилось ОТОБРАЖЕНИЕ
          })
          editor.getDecor().click()
          editor.getDeleteButton().click()          // УДаление декора
      })

      it('СМЕНА ШРИФТА', ()=>{
        let fontOld
        let fontNew
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        cy.visit('https://flyvi.io/app/designs/35d93b72-9e1f-4d66-8e3a-763580f56b') 
        cy.retryDecorDelete() // Удаление лишних декоров с холста перед тестом
        cy.get('.flyvi-decors-drawer__menu_container').contains('Текст').should('be.visible').click()
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
        cy.get('.selectLabel_oRghk').should((x)=>{
          fontOld = x.text().trim()
          expect(fontOld).to.eq('Roboto') // Проверка, что у добавленного текста шрифт - РОБОТО
        })
        cy.get('#editorToolbar .selectLabel_oRghk').click() // Вызов меню шрифтов
        cy.get('.font-container').eq(0).find('.font-item').eq(randomNumber).click() // Применить случайный шрифт к тексту
        cy.get('.selectLabel_oRghk').should((x)=>{
          fontNew = x.text().trim()
          expect(fontOld).to.not.eq(fontNew) // Проверка, что у текстового декора сменился шрифт
        })
        editor.getDecor()
        editor.getDeleteButton().click()
      })

      it('Удаление ФОТО ИИ из меню', ()=>{
        cy.intercept('**AI-TEXT2IMG&perPage=15*').as('totalII')
        cy.visit('https://flyvi.io/app/designs/35d93b72-9e1f-4d66-8e3a-7680e3f56b')
        cy.contains('ИИ-мастерская').click()
        cy.get('.tabs_5-b6l').contains('Мои картинки').click()
        cy.wait('@totalII').then((t)=>{
          if(t.response.body.meta.total<20){
            throw new Error('<<<Осталось меньше 20 сгенерированных фото>>>')
          }
        })
        cy.get('.v-image__image.v-image__image--cover').eq(0).should('be.visible')
        cy.get('.action_Ma37k').eq(0).invoke('show').click()
        cy.get('[role="menu"]').contains('Удалить').click()
        cy.get('.dialog').contains('Удалить').click()
        //Cypress._.times(4, ()=>{                                // Указать количество фото для удаления
          //cy.get('.v-image__image.v-image__image--cover').eq(0).should('be.visible')
          //cy.get('.action_Ma37k').eq(0).invoke('show').click()
          //cy.get('[role="menu"]').contains('Удалить').click()
          //cy.get('.dialog').contains('Удалить').click()
        //})
      })
      }) 