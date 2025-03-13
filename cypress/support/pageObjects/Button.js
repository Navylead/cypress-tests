class Button {
    elements = {
        getAccessBtn: ()=> cy.contains('Доступ'),                  // Доступ
        getDownloadBtn: ()=> cy.contains('Скачать'),               // Скачать
        getChangeSizeBtn: ()=> cy.contains('Изменить размер'),     // Изменить размер
        getMainPageBtn: ()=> cy.contains('Главная'),               // Кнопка На Главную
        getCreateDesignBtn: ()=> cy.contains('Создать дизайн'),    // Кнопка создать дизайн
        getAvatarBtn: ()=> cy.get('.site-header .profile')         // Аватарка



    }
}


export default Button;