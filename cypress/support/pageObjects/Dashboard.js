class Dashboard {
    createDesignBtn = () => cy.get('.site-header').contains('button', 'Создать дизайн')   // Кнопка создать дизайн
    userLogo = () => cy.get('.site-header .profile').contains('N')                        // Логотип юзера
    userDesignsList = () => cy.get('.stories-list')                                       // Список дизайнов юзера в Дашборде
    dashboardBtn = () => cy.get('.drawer').contains('Дашборд')                            // Кнопка перехода на ДАШБОРД
}

export default Dashboard;