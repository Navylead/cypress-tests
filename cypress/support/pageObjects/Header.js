class Header {
    elements = {
        getLogoLink: ()=> cy.get('.header .header-logo'),                // лого
        getTariffLink: ()=> cy.get('.drawer .drawer-account'),           // тариф
        getLoginLink: ()=> cy.contains('Войти'),
        getRegLink: ()=> cy.contains('Зарегистрироваться')
    }
}





export default Header;