export default abstract class BasePage {
  protected baseUrl: string

  constructor() {
    if (!Cypress.env('AUTOMATENOW_URL')) {
      throw new Error('AUTOMATENOW_URL environment variable is not set')
    }
    this.baseUrl = Cypress.env('AUTOMATENOW_URL')
  }

  visit(path: string): void {
    cy.visit(`${this.baseUrl}${path}`)
  }
}
