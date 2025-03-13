class LoginPage {
    
    getEmailInput = () => cy.get('input[name="email"]')                          // Инпут электоронной почты
    getPasswordInput = () => cy.get('input[name="password"]')                    // Инпут пароля
    getSubmitButton = () => cy.get('button[type="submit"]')                      // Кнопка ВОЙТИ
    getRestoreButton = () => cy.get('a.accent--text').contains('Забыли пароль?') // Кнопка ЗАБЫЛИ ПАРОЛЬ?
}

export default LoginPage;