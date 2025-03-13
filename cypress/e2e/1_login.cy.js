/// <reference types= "cypress" />
import { random } from 'lodash';
import Header from "../support/pageObjects/Header.js"
const header = new Header()
import Button from "../support/pageObjects/Button.js"
const button = new Button()
import LoginPage from "../support/pageObjects/LoginPage.js"
const loginPage = new LoginPage()

describe('Регистрация и Авторизация', ()=>{
    beforeEach(()=>{cy.viewport(1920, 1080)  
    }) 

    it.skip('РЕГИСТРАЦИЯ', ()=>{
        let randomNumber = random(1, 200000).toString()
        cy.intercept('POST', 'https://api.flyvi.io/api/auth/register').as('register')
        cy.visit('https://flyvi.io/app/login')
        cy.get('.auth-form__header').contains('Зарегистрируйтесь').should('be.visible').click()
        cy.get('.dialog-wrapper').contains('button', 'Зарегистрироваться').should('be.visible').click()
        cy.get('.dialog-wrapper input[name="name"]').should('be.visible').type(`test${randomNumber}`) // Имя пользователя
        cy.get('.dialog-wrapper input[placeholder="Введите адрес электронной почты"]').should('be.visible').type(`test${randomNumber}@gmail.com`) // Почта
        cy.get('.dialog-wrapper input[placeholder="Создайте пароль"]').should('be.visible').type('0123456789') // Пароль
        cy.get('.dialog-wrapper [role="checkbox"]').eq(0).check({force:true})
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.wait('@register').then((req, resp)=>{
            console.log(req)
            expect(req.request.body.email).to.eq(`test${randomNumber}@gmail.com`)   // АПИ почта
            expect(req.request.body.name).to.eq(`test${randomNumber}`)              // АПИ имя пользователя 
            expect(req.request.body.password).to.eq('0123456789')                   // АПИ пароль
            
        })
        cy.get('.dialog-wrapper.dialog-wrapper__success').should('be.visible') //Сообщение об успешной регистрации
        cy.get('.dialog-wrapper.dialog-wrapper__success h2').should('be.visible').then((mes)=>{
            expect(mes.text().trim()).to.eq('Ещё немного!')
        })                                                          // Заголовок сообщения
        cy.get('.dialog-wrapper.dialog-wrapper__success').find('button').contains('Хорошо').should('be.visible') // Кнопка ХОРОШО
    })

    it('Ргистрация с существующим EMAIL', ()=>{
        cy.visit('https://flyvi.io/app/login')
        cy.intercept('**/api/auth/register').as('register')
        cy.contains('a', 'Зарегистрируйтесь').should('be.visible').click()          // Переход к регистрации
        cy.contains('button', 'Зарегистрироваться').should('be.visible').click()    // Клик по кнопке Зерегистрироваться 
        cy.get('input#name').should('be.visible').type('TestUser')                  // Ввод имени пользователя
        cy.get('[placeholder="Введите адрес электронной почты"]').should('be.visible').type(Cypress.env('pMail2')) // Ввод почты
        cy.get('[placeholder="Создайте пароль"]').should('be.visible').type('000111222333') // Ввод пароля
        cy.get('.dialog-form__field i').eq(0).click({force:true})                           // Выбрать первый чекбокс
        cy.contains('button', 'Начать работу').should('be.visible').click()                 // Клик по кнопке Начать работу
        cy.wait('@register', {timeout:10000}).should((resp)=>{
            let error = resp.response.body.errors.email[0]
            expect(error).to.eq("Данный email уже зарегистрирован")                         // Проверка, что по АПИ приходит ошибка
        }) 
        cy.contains('div', 'Данный email уже зарегистрирован').should('be.visible')         // Проверка, что отображается попапс ошибкой
    })

    it('АВТОРИЗАЦИЯ', ()=>{
        cy.intercept('POST', 'https://api.flyvi.io/api/auth/login').as('login')
        cy.intercept('https://api.flyvi.io/api/auth/me').as('me')
        cy.intercept('POST', 'https://api.flyvi.io/api/auth/logout').as('logout')
        cy.login3(Cypress.env('pMail'), Cypress.env('pPass'))
        cy.visit('https://flyvi.io/app/') // Вход в ДАШБОРД
        cy.wait('@login').then((req)=>{
            expect(req.request.body.email).to.eq(Cypress.env('pMail'))
            expect(req.request.body.password).to.eq(Cypress.env('pPass'))
        })
        cy.wait('@me', {timeout:10000}).then(function (r){
            let name = JSON.stringify(r.response.body.user.name)
            let email = JSON.stringify(r.response.body.user.email)
            let id = JSON.stringify(r.response.body.user.id)
            expect(email).to.eq('"xxx.com"')      // проверка МЭЙЛА
            expect(id).to.eq('89671')                           // проверка ID     
            expect(name).to.eq('"Ликси"')                       // проверка имени пользователя                  
        })
        cy.get('.db-search__search.search [placeholder="Ищите среди тысяч шаблонов"]')  // Поле поиска шаблонов
        cy.get('.drawer-header img', {timeout:20000}).should('be.visible')              // ЛОГО
        cy.get('.drawer-main__nav a').should('be.visible').and('have.length', 9)        // Левое меню
        //header.elements.getTariffLink().should('be.visible')                          // Тариф
        cy.get('.drawer .drawer-account .drawer-account__tariff-name').should('be.visible').then(t=>{
            expect(t.text().trim()).to.eq('Pro')                                      // Название тарифа
        })
        //button.elements.getCreateDesignBtn().should('be.visible')                     // Создать дизайн
        //button.elements.getAvatarBtn().should('be.visible')                           // Аватарка
        cy.url().should('contain', '/app')
        cy.title().should('eq', 'Дашборд | Flyvi')
        cy.get('.pageUnderHeader_2JgqP').should('be.visible').then((t)=>{
            expect(t.text().trim()).to.eq('Последние дизайны')
        })                                                                         // Последние дизайны заголовок
        cy.get('.stories-list .card_idm0d').should('be.visible').and('have.length.greaterThan', 0)
        cy.get('.d-flex.align-center').click()
        cy.contains('Выйти').click()                                               // Выход из аккаунта
        cy.wait('@logout').then((r)=>{
            console.log(r.response.body.message)
            expect(r.response.body.message).to.eq('Вы успешно вышли из системы.')  // Ответ по АПИ о выходе из аккаунта
        })
        cy.get('.auth-form__wrapper').contains('Вход в свой аккаунт')              // Отображается форма авторизации
    })

    it('АВТОРИЗАЦИЯ - неверные данные', ()=>{
        cy.visit('https://flyvi.io/app/')
        loginPage.getEmailInput().type('testmail@mail.com')
        loginPage.getPasswordInput().type('1234567890')
        loginPage.getSubmitButton().click()
        cy.contains('Email или пароль введены некорректно.')
    })

    it('АВТОРИЗАЦИЯ - пустые поля', ()=>{
        cy.visit('https://flyvi.io/app/')
        loginPage.getSubmitButton().click()
        cy.contains('E-mail не может быть пустым').should('be.visible')
        cy.contains('Пароль не может быть пустым').should('be.visible')
    })

    it('АВТОРИЗАЦИЯ - восстановить пароль', ()=>{
        const email = 'xxx.com'
        cy.visit('https://flyvi.io/app/')
        loginPage.getRestoreButton().should('be.visible').click() // Клик по кнопке ЗАБЫЛИ ПАРОЛЬ
        // СМЕНА СТРАНИЦЫ =>
        cy.get('.auth-form__wrapper').contains('button', 'Восстановить пароль').should('be.visible') // Проверка отображения кнопки ВОССТАНОВИТЬ ПАРОЛЬ
        cy.get('.auth-form__wrapper').contains('a', 'Войдите').should('be.visible') // Проверка отображения кнопки ВОЙДИТЕ
        loginPage.getEmailInput().should('be.visible')      // Проверка отображения инпута для EMAIL
        loginPage.getEmailInput().type(email)               // Ввод почты для восстановления
        cy.intercept('POST','https://api.flyvi.io/api/password/forgot').as('restore')
        cy.get('.auth-form__wrapper').contains('button', 'Восстановить пароль').click() // Клик по кнопке ВОССТАНОВИТЬ ПАРОЛЬ
        cy.wait('@restore').then((x)=>{
            expect(x.request.body).to.contain(email)                            // Проверка, что в запросе ушла корректная почта
            expect(x.response.body.message).to.eq('На email выслано письмо для сброса пароля.') // Проверка ответа на успешный сброс пароля
        })
    })
})