/// <reference types= "cypress" />

import Header from "../support/pageObjects/Header.js"
const header = new Header()
import Button from "../support/pageObjects/Button.js"
const button = new Button()
import Dashboard from "../support/pageObjects/Dashboard.js"
const dashboard = new Dashboard()
import Editor from "../support/pageObjects/Editor.js"
const editor = new Editor()


describe('Проверка загрузки ДИЗАЙНОВ', ()=>{
    beforeEach(()=>{cy.viewport(1920, 1080)
    cy.login3(Cypress.env('pMail'), Cypress.env('pPass'))  
    }) 

    it('ЗАГРУЗКА ДИЗАЙНА', ()=>{
        cy.intercept('https://api.flyvi.io/api/designs/2a24881a-930d-4a11-a034-969632f9e74c?withDecors=1').as('design')
        cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
        cy.wait('@design').then((r)=>{
          console.log(r.response.body)
          expect(r.response.body.data.user_id).to.eq(89671)             // Проверка юзер АЙДИ
          expect(r.response.body.data.pages[0].name).to.eq('Первая')    // Проверка навзвания страницы
          expect(r.response.body.data.pages[0].decors.length).to.eq(4)  // Проверка количества декоров на странице(4)

        })
        cy.url().should('include', '/2a24881a-930d-4a11-a034-969632f9e7')      // Проверка урла
        cy.title().should('eq', 'Загрузка дизайна 1 | Flyvi')                    // Проверка тайтла
        cy.get('.site-story-form__wrapper').should('be.visible').then((t)=>{     // Проверка названия дизайна
            expect(t.text().trim()).to.eq('Загрузка дизайна 1')
          })
        button.elements.getAccessBtn().should('be.visible').then((x)=>{
            expect(x.text().trim()).to.eq('Доступ')
          })
        button.elements.getDownloadBtn().should('be.visible').then((x)=>{ // Кнопка СКАЧАТЬ
            expect(x.text().trim()).to.eq('Скачать')
          })
        button.elements.getChangeSizeBtn().should('be.visible').then((x)=>{
            expect(x.text().trim()).to.eq('Изменить размер')
          })
        header.elements.getLogoLink().should('be.visible')
        button.elements.getMainPageBtn().should('be.visible')     // Кнопка На главную
        // Отображение элементов левого меню
        cy.get('.flyvi-decors-drawer__menu_container').contains('Шаблоны').should('be.visible')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Загрузки').should('be.visible')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Брендбук').should('be.visible')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Медиа').should('be.visible')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Маски').should('be.visible')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Элементы').should('be.visible')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Текст').should('be.visible')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Виджеты').should('be.visible')
        cy.get('.flyvi-decors-drawer__menu_container').contains('Фоны').should('be.visible')
        cy.get('.design-main-editor').contains('+ Еще 1 страница').should('be.visible')
        cy.get('.page-header-wrapper .page-header-name').should('be.visible').then((t)=>{
            expect(t.text().trim()).to.eq('Первая')
          }) 
      })

    it('ДАШБОРД. Создание дизайна по своим размерам', ()=>{
        cy.visit('https://flyvi.io/app')
        dashboard.userDesignsList().should('be.visible')
        dashboard.createDesignBtn().click()
        cy.get('.custom-design-btn_wrapper').contains('button', 'Настраиваемый размер').click()
        cy.get('.fields-custom-design input').eq(0).clear().type('111') // ШИРИНА
        cy.get('.fields-custom-design input').eq(1).clear().type('200') // ВЫСОТА

        let attempt = 0
        const maxAttempt = 5
        const retryCreateDesign = () => {
            cy.get('div').then((l)=>{
                if(l.find('.header').length < 1 && attempt < maxAttempt) {
                    attempt++          
                    cy.get('.custom-design-menu').contains('button', 'Создать дизайн').click()
                    cy.wait(3000)
                    retryCreateDesign();
                } 
                else if(attempt>= maxAttempt) {
                    throw new Error('<<<ПРЕВЫШЕНО КОЛИЧЕСТВО ПОПЫТОК СОЗДАТЬ ДИЗАЙН>>>')
                }})
        }
        cy.get('.custom-design-menu').contains('button', 'Создать дизайн').click()
        cy.wait(3000)
        retryCreateDesign()
        //cy.get('.slick-list').contains('Задать свой размер').click({force:true})
        //cy.get('.resize-dialog input').eq(0).clear().type('111') // ШИРИНА
        //cy.get('.resize-dialog input').eq(1).clear().type('200') // ВЫСОТА
        //cy.get('.resize-dialog').contains('button', 'Создать дизайн').click()
        editor.getDownloadBtn().should('be.visible')                         // Отображение кнопки СКАЧАТЬ в эдиторе
        editor.accessBtn().should('be.visible')                              // Отображение кнопки ДОСТУП в эдиторе
        editor.goMain().should('be.visible')                                 // Отображение кнопки ГЛАВНАЯ в эдиторе
        cy.get('.flyvi-decor-background').then((size)=>{
            let height = size[0].clientHeight
            let width = size[0].clientWidth
            expect(height).to.eq(2000)
            expect(width).to.eq(1110)}) // Проверка соответствия заданных и фактических размеров
    })

    it.skip('ДАШБОРД. Создание дизайн по готовым размерам - <<<НОВОЕ ОКНО>>>', ()=>{   // ОТКРЫВАЕТСЯ В НОВОМ ОКНЕ!!!
        cy.visit('https://flyvi.io/app')
        cy.get('.db-search').contains('Маркетплейсы').should('be.visible').click()
        cy.get('.db-tags').contains('Wildberries').should('be.visible').click()
        cy.get('.slick-track').contains('Рич-контент Wildberries').should('be.visible').click()
        cy.wait(1000)
        cy.get('.header').contains('button', 'Скачать').should('be.visible')
        cy.get('.header').contains('button', 'Главная').should('be.visible')
        cy.get('.flyvi-decor-background').then((size)=>{
          let height = size[0].clientHeight
          let width = size[0].clientWidth
          expect(height).to.eq(900)
          expect(width).to.eq(1440)}) // Проверка соответствия заданных и фактических размеров    
      })
    
    it('ДАШБОРД. Создание Истории Instagram', ()=>{
          cy.visit('https://flyvi.io/app')
          dashboard.userDesignsList().should('be.visible')
          cy.get('.site-header-wrapper').contains('Создать дизайн').click()
          cy.get('div [role="listbox"]').contains('Соцсети').click()
          cy.get('div [role="listbox"]').contains('История Instagram').click()
          editor.getDownloadButton({timeout:20000})
          cy.get('.header', {timeout:20000}).contains('Скачать').should('be.visible')
          cy.get('.flyvi-decor-background').then((size)=>{
            let height = size[0].clientHeight
            let width = size[0].clientWidth
            expect(height).to.eq(1920)
            expect(width).to.eq(1080)}) // Проверка соответствия заданных и фактических размеров
          })
    
    it('ДАШБОРД. Создание Презентации 4:3', ()=>{
          cy.visit('https://flyvi.io/app')
          dashboard.userDesignsList().should('be.visible')
          cy.get('.site-header-wrapper').contains('Создать дизайн').click()
          cy.get('div [role="listbox"]').contains('Презентации').click()
          cy.get('div [role="listbox"]').contains('Презентация 4:3').click()
          editor.getDownloadButton({timeout:20000})
          cy.get('.header', {timeout:20000}).contains('button', 'Презентация').should('be.visible')
          cy.get('.flyvi-decor-background').then((size)=>{
            let height = size[0].clientHeight
            let width = size[0].clientWidth
            expect(height).to.eq(768)
            expect(width).to.eq(1024)}) // Проверка соответствия заданных и фактических размеров
          })
    
    it('ДИЗАЙНЫ. Удаление дизайна', ()=>{
          cy.visit('https://flyvi.io/app/designs')
          cy.get('.stories-list .card_idm0d').its('length').should('be.above', 15)
          cy.get('.stories-list button').first().invoke('show').click()
          cy.get('.v-list.action-list.v-sheet.theme--light').contains('Удалить').click()
          cy.get('.vc-container').contains('Удалить').should('be.visible').click()
          cy.get('.Vue-Toastification__toast-body').contains('Дизайн успешно удален')
        })
        
    it.skip('ДИЗАЙНЫ. Создание WEB-story - <<<НОВОЕ ОКНО>>>', ()=>{               // ОТКРЫВАЕТСЯ В НОВОМ ОКНЕ
          cy.visit('https://flyvi.io/app/stories')
          cy.scrollTo('bottom')
          cy.get('.stories-list .card_idm0d').its('length').then((c)=>{
            let oldStoryCount = c
            cy.get('.canvas-header').contains('button', 'Создать web-сторис').click()
            cy.wait(1000)
            cy.get('.drawer-main__nav').contains('Web').click()
            cy.wait(1000)
            cy.get('.drawer-main__nav [href="/app/stories"]').click()
            cy.wait(1000)
            cy.scrollTo('bottom')
            cy.get('.stories-list .card_idm0d').its('length').then((c)=>{
              let newStoryCount = c
              expect(newStoryCount).to.be.greaterThan(oldStoryCount)
            })
          })
        })
    
    it('Открыть ВЕБ-стори', ()=>{
      cy.visit('https://flyvi.io/app/designs/41e40a86-6515-4c4a-95a8-7f85039c39')
      cy.get('#editorHeader').contains('button', 'Опубликовать на сайте').should('be.visible') // Кнопка Опубликовать
      cy.get('#editorHeader').contains('Стандарт').should('be.visible')                        // Отображение привязанного АЛЬБОМА
      cy.get('#editorHeader div[class="site-story-form__value"]').then((t)=>{ 
        expect(t.text().trim()).to.eq('Открыть стори')                                          // Название стори
        })
      })

    it('СКАЧИВАНИЕ ДИЗАЙНА png', function(){
      cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
      cy.get('.site-story-form__wrapper').should('be.visible').then((t)=>{     // Проверка названия дизайна
        expect(t.text().trim()).to.eq('Загрузка дизайна 1')
      })
      cy.get('.header').contains('button', 'Скачать').should('be.visible').click() // Клик по СКАЧАТЬ
      cy.get('.site-story-download__menu-content')
        .contains('button', 'Скачать')
        .should('be.visible')
        .click() // Клик по СКАЧАТЬ в меню скачивания
      cy.get('.d-flex.flex-column')
        .contains('button', 'Отменить')
        .should('be.visible') // Проверка отображения попапа СКАЧИВАНИЯ
      cy.get('.dialog-ready.dialog-wrapper__download', {timeout:20000})
        .contains('button', 'Продолжить редактирование')
        .should('be.visible') // Проверка отображения попапа ЗАВЕРШЕНИЯ ЗАГРУЗКИ
    })

    it('СКАЧИВАНИЕ ДИЗАЙНА ЧЕРЕЗ КОНТЕКСТНОЕ МЕНЮ', function(){
      cy.visit('https://flyvi.io/app/designs')
      cy.get('.stories-list .card_idm0d').first().find('button').click({force:true})
      cy.get('.v-list.action-list.v-sheet.theme--light').contains('Скачать').click()
      cy.get('.d-flex.flex-column')
        .contains('button', 'Отменить')
        .should('be.visible') // Проверка отображения попапа СКАЧИВАНИЯ
      cy.get('.dialog-ready.dialog-wrapper__download', {timeout:20000})
        .contains('button', 'Продолжить редактирование')
        .should('be.visible') // Проверка отображения попапа ЗАВЕРШЕНИЯ ЗАГРУЗКИ
    
    })

    it('СКАЧИВАНИЕ ДИЗАЙНА jpg', ()=>{
      cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
      cy.get('.site-story-form__wrapper').should('be.visible').then((t)=>{     // Проверка названия дизайна
        expect(t.text().trim()).to.eq('Загрузка дизайна 1')
      })
      cy.get('.header').contains('button', 'Скачать').should('be.visible').click() // Клик по СКАЧАТЬ
      cy.get('.v-select__selections').should('be.visible').click()
      cy.get('div[role="option"]').contains('JPG').should('be.visible').click() // Выбрать формат JPG
      cy.get('.site-story-download__menu-content')
        .contains('button', 'Скачать')
        .should('be.visible')
        .click() // Клик по СКАЧАТЬ в меню скачивания
      cy.get('.d-flex.flex-column')
        .contains('button', 'Отменить')
        .should('be.visible') // Проверка отображения попапа СКАЧИВАНИЯ
      cy.get('.dialog-ready.dialog-wrapper__download', {timeout:15000})
        .contains('button', 'Продолжить редактирование')
        .should('be.visible') // Проверка отображения попапа ЗАВЕРШЕНИЯ ЗАГРУЗКИ
    })

    it('СКАЧИВАНИЕ ДИЗАЙНА pdf', ()=>{
      cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
      cy.get('.site-story-form__wrapper').should('be.visible').then((t)=>{     // Проверка названия дизайна
        expect(t.text().trim()).to.eq('Загрузка дизайна 1')
      })
      cy.get('.header').contains('button', 'Скачать').should('be.visible').click() // Клик по СКАЧАТЬ
      cy.get('.v-select__selections').should('be.visible').click()
      cy.get('div[role="option"]').contains('PDF').should('be.visible').click() // Выбрать формат PDF
      cy.get('.site-story-download__menu-content')
        .contains('button', 'Скачать')
        .should('be.visible')
        .click() // Клик по СКАЧАТЬ в меню скачивания
        cy.get('.d-flex.flex-column')
        .contains('button', 'Отменить')
        .should('be.visible') // Проверка отображения попапа СКАЧИВАНИЯ
      cy.get('.dialog-ready.dialog-wrapper__download', {timeout:20000})
        .contains('button', 'Продолжить редактирование')
        .should('be.visible') // Проверка отображения попапа ЗАВЕРШЕНИЯ ЗАГРУЗКИ
    })

    it('СКАЧИВАНИЕ ДИЗАЙНА mp4', ()=>{
      cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
      cy.get('.site-story-form__wrapper').should('be.visible').then((t)=>{     // Проверка названия дизайна
        expect(t.text().trim()).to.eq('Загрузка дизайна 1')
      })
      cy.get('.header').contains('button', 'Скачать').should('be.visible').click() // Клик по СКАЧАТЬ
      cy.get('.v-select__selections').should('be.visible').click()
      cy.get('div[role="option"]').contains('MP4').should('be.visible').click() // Выбрать формат MP4
      cy.get('.site-story-download__menu-content')
        .contains('button', 'Скачать')
        .should('be.visible')
        .click() // Клик по СКАЧАТЬ в меню скачивания
        cy.get('.d-flex.flex-column')
        .contains('button', 'Отменить')
        .should('be.visible') // Проверка отображения попапа СКАЧИВАНИЯ
      cy.get('.dialog-ready.dialog-wrapper__download', {timeout:50000})
        .contains('button', 'Продолжить редактирование')
        .should('be.visible') // Проверка отображения попапа ЗАВЕРШЕНИЯ ЗАГРУЗКИ
    })

    it('СКАЧИВАНИЕ ДИЗАЙНА gif', ()=>{
      cy.visit('https://flyvi.io/app/designs/2a24881a-930d-4a11-a034-969632f9e7')
      cy.get('.site-story-form__wrapper').should('be.visible').then((t)=>{     // Проверка названия дизайна
        expect(t.text().trim()).to.eq('Загрузка дизайна 1')
      })
      cy.get('.header').contains('button', 'Скачать').should('be.visible').click() // Клик по СКАЧАТЬ
      cy.get('.v-select__selections').should('be.visible').click()
      cy.get('div[role="option"]').contains('GIF').should('be.visible').click() // Выбрать формат GIF
      cy.get('.site-story-download__menu-content')
        .contains('button', 'Скачать')
        .should('be.visible')
        .click() // Клик по СКАЧАТЬ в меню скачивания
        cy.get('.d-flex.flex-column')
        .contains('button', 'Отменить')
        .should('be.visible') // Проверка отображения попапа СКАЧИВАНИЯ
      cy.get('.dialog-ready.dialog-wrapper__download', {timeout:50000})
        .contains('button', 'Продолжить редактирование')
        .should('be.visible') // Проверка отображения попапа ЗАВЕРШЕНИЯ ЗАГРУЗКИ
    })
})