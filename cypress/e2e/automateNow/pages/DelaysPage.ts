import BasePage from './BasePage'

class DelaysPage extends BasePage {
  private selectors = {
    startButton: {
      byId: '#start',
      byText: 'Start',
      byTag: 'button',
    },
    delayInput: {
      byId: '#delay',
      byAttribute: 'input[type="text"][id="delay"]',
    },
  }

  visit(): void {
    super.visit('/javascript-delays')
  }

  clickStartButton(): void {
    cy.get(this.selectors.startButton.byId, { timeout: 1000 })
      .should('exist')
      .click({ force: true })
  }

  verifyLiftoffText(): void {
    cy.get(this.selectors.delayInput.byId, { timeout: 12000 })
      .should('be.visible')
      .should($input => {
        const value = $input.val()
        expect(value).to.equal('Liftoff!')
      })
  }
}

export default new DelaysPage()
