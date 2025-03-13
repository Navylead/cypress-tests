class Editor {
    getDecor = () => cy.get('.story-box-inner__wrapper .decor-layer')               // Декор на холсте
    getDeleteButton = () => cy.get('.control_HJ2Cw button').last()                  // Кнопка УДАЛИТЬ в тулбаре
    getDownloadButton = () => cy.get('.header').contains('button', 'Скачать')       // Кнопка СКАЧАТЬ в хэдере
    getResizeButton = () => cy.get('.header').contains('button', 'Изменить размер') // Кнопка смены размера в хэдере
    getDownloadBtn = () => cy.get('.header', {timeout:30000}).contains('button', 'Скачать') // Кнопка Скачивания дизайна
    accessBtn = () => cy.get('.header', {timeout:30000}).contains('button', 'Доступ')       // Кнопка ДОСТУПа
    goMain = () => cy.get('.header').contains('button', 'Главная')                          // Кнопка НА ГЛАВНУЮ
    canvas = () => cy.get('.story-box-inner__wrapper')                                      // Холст
    changesSavedBtn = () => cy.get('header').contains('button', 'Изменения сохранены')      // Изменения сохранены
}

export default Editor;