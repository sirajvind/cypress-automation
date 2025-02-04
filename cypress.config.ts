import { defineConfig } from 'cypress'
import codeCoverage from '@cypress/code-coverage/task'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverage(on, config)
      return config
    },
    supportFile: 'cypress/support/e2e.{js,ts}',
    specPattern: 'cypress/e2e/**/*.{cy.js,cy.jsx,cy.ts,cy.tsx}',
    chromeWebSecurity: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true,
      reportFilename: '[status]_[datetime]-[name]-report',
      timestamp: 'longDate',
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  projectId: 'feiorz',
})
