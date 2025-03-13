// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register'; //REPORTER
// Alternatively you can use CommonJS syntax:
// require('./commands')



// ДОБАВЛЕНО ИСКЛЮЧЕНИЕ, ЧТО ВЕБ-СОКЕТ ДО СИХ ПОР В РАБОТЕ!!!!!!!!!!!!!!!!!!!

  // we expect a 3rd party library error with message 'list not defined'
  // and don't want to fail the test so we return false
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('WebSocket'))
     {return false}
    if (err.message.includes('documentElement'))
     {return false}
    if (err.message.includes('offset'))
     {return false}
    if (err.message.includes('current_page'))
     {return false}
    if (err.message.includes('category'))
     {return false}
    if (err.message.includes('reading'))
     {return false}
    if (err.message.includes('Network'))
      {return false}
    if (err.message.includes('Not found'))
      {return false}
    if (err.message.includes('404'))
      {return false}
    })
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test 
