const { defineConfig } = require("cypress");

module.exports = defineConfig({
 videosFolder: 'cypress/video',
 projectId: "q5wkn5",
 screenshotsFolder: 'cypress/screenshots',
 screenshotOnRunFailure: false,
 video: true,
 defaultCommandTimeout: 8000,

 reporter: 'cypress-mochawesome-reporter',  //REPORTER
 "reporterOptions": {
 "reportDir": "cypress/reports/html",
 "overwrite": true,
 "inlineAssets": true,
 "cdn": true,
 "inline": true,
 "assetsDir": "/home/runner/work/FLV/FLV/cypress/reports/html/assets", 
 },

 e2e: {
 setupNodeEvents(on, config) {
 require('cypress-mochawesome-reporter/plugin')(on); //REPORTER
 // implement node event listeners here
 //baseUrl: 'https://example.cypress.io'
 },
 }
 },
);