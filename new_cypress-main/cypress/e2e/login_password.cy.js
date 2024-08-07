import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
describe('Проверка авторизации', function () {
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
       });

    it('Верный пароль и верный логин', function () {
       cy.visit('/');
       cy.get(main_page.email).type(data.login);
       cy.get(main_page.password).type(data.password);
       cy.get(main_page.login_button).click();
       cy.get(result_page.title).contains('Авторизация прошла успешно');
       cy.get(result_page.title).should('be.visible');
       
       })
})

    it('Проверка восстановление пароля', function () {
       cy.visit('/');
       cy.get(main_page.fogot_pass_btn).click();
       cy.get(recovery_password_page.email).type(data.login);
       cy.get(recovery_password_page.send_button).click();
       cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
       cy.get(result_page.title).should('be.visible');
       })

    it('Не верный логин и верный пароль', function () {
        cy.visit('/');
        cy.get(main_page.email).type('german@dolnikov777.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.title).should('be.visible');
        })

    it('Проверка ввести логин без @', function () {
        cy.visit('/');
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
        cy.get(result_page.title).should('be.visible');
        })

    it('Проверку на приведение к строчным буквам в логине', function () {
        cy.visit('/');
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
       cy.get(result_page.title).should('be.visible');
         })