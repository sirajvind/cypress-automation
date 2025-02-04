import BasePage from './BasePage'
import { faker } from '@faker-js/faker'

class FormFieldPage extends BasePage {
  private selectors = {
    nameInput: {
      byDataCy: '[data-cy="name-input"]',
      byDataTestId: '[data-testid="name-input"]',
      byId: '#name-input',
      byName: 'input[name="name-input"]',
    },
    passwordInput: {
      byType: 'input[type="password"]',
      byLabel: 'label input[type="password"]',
      byForm: '#feedbackForm input[type="password"]',
    },
    drinkCheckboxes: {
      byDataCy: (index: number): string => `[data-cy="drink${index}"]`,
      byDataTestId: (index: number): string => `[data-testid="drink${index}"]`,
      byId: (index: number): string => `#drink${index}`,
    },
    colorRadioButtons: {
      byId: (index: number): string => `#color${index}`,
      byDataCy: (index: number): string => `[data-cy="color${index}"]`,
      byDataTestId: (index: number): string => `[data-testid="color${index}"]`,
    },
    automationDropdown: {
      byId: '#automation',
      byDataCy: '[data-cy="automation"]',
      byDataTestId: '[data-testid="automation"]',
      options: {
        yes: {
          byValue: 'yes',
          byDataCy: '[data-cy="automation-yes"]',
          byDataTestId: '[data-testid="automation-yes"]',
        },
        no: {
          byValue: 'no',
          byDataCy: '[data-cy="automation-no"]',
          byDataTestId: '[data-testid="automation-no"]',
        },
        undecided: {
          byValue: 'undecided',
          byDataCy: '[data-cy="automation-undecided"]',
          byDataTestId: '[data-testid="automation-undecided"]',
        },
      },
    },
    automationToolsList: {
      byText: (toolName: string): string => `li:contains("${toolName}")`,
    },
    emailInput: {
      byDataCy: '[data-cy="email"]',
      byDataTestId: '[data-testid="email"]',
      byId: '#email',
    },
    messageInput: {
      byDataCy: '[data-cy="message"]',
      byDataTestId: '[data-testid="message"]',
      byId: '#message',
    },
    submitButton: {
      byDataCy: '[data-cy="submit-btn"]',
      byDataTestId: '[data-testid="submit-btn"]',
      byId: '#submit-btn',
    },
  }

  visit(): void {
    super.visit('/form-fields')
  }

  fillNameField(): void {
    const name = faker.person.fullName()
    cy.get(this.selectors.nameInput.byDataCy).clear()
    cy.get(this.selectors.nameInput.byDataCy).type(name)
  }

  fillPasswordField(): void {
    const password = faker.internet.password()
    cy.get(this.selectors.passwordInput.byType).clear()
    cy.get(this.selectors.passwordInput.byType).type(password)
  }

  selectRandomDrinks(): void {
    const numberOfDrinks = faker.number.int({ min: 1, max: 5 })
    const selectedDrinks = faker.helpers.uniqueArray([1, 2, 3, 4, 5], numberOfDrinks)

    selectedDrinks.forEach(drinkNumber => {
      cy.get(this.selectors.drinkCheckboxes.byId(drinkNumber)).check({ force: true })
    })
  }

  selectRandomColor(): void {
    const colorIndex = faker.number.int({ min: 1, max: 5 })
    cy.get(this.selectors.colorRadioButtons.byDataCy(colorIndex)).check({ force: true })
  }

  selectRandomAutomationOption(): void {
    const options = ['yes', 'no', 'undecided']
    const randomOption = faker.helpers.arrayElement(options)
    cy.get(this.selectors.automationDropdown.byId).select(
      this.selectors.automationDropdown.options[
        randomOption as keyof typeof this.selectors.automationDropdown.options
      ].byValue
    )
  }

  validateAutomationToolsList(): void {
    const expectedTools = ['Selenium', 'Playwright', 'Cypress', 'Appium', 'Katalon Studio']
    expectedTools.forEach(tool => {
      cy.contains('li', tool).should('exist')
      cy.get('#feedbackForm').find('li').contains(tool).should('exist')
    })
  }

  fillEmailField(): void {
    const email = faker.internet.email()
    cy.get(this.selectors.emailInput.byDataCy).clear()
    cy.get(this.selectors.emailInput.byDataCy).type(email)
  }

  fillMessageField(): void {
    const message = faker.lorem.paragraph()
    cy.get(this.selectors.messageInput.byDataCy).clear()
    cy.get(this.selectors.messageInput.byDataCy).type(message)
  }

  submitForm(): void {
    cy.get(this.selectors.submitButton.byDataCy).click()
  }

  validateAlert(): void {
    cy.on('window:alert', alert => {
      expect(alert).to.be.equal('Message received!')
    })
  }
}

export default new FormFieldPage()
