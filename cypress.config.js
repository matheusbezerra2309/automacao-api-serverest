const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    setupNodeEvents(on, config) {},
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'isoDateTime',
      quiet: true
    },
  },
  env: {
    email: 'fulano@qa.com',
    password: 'teste',
    novoUsuarioId: null,

  }
})