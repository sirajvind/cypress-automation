import FormFieldPage from '../pages/FormFieldPage'

describe('Form Field Feature Test', () => {
  beforeEach(() => {
    FormFieldPage.visit()
  })

  it('fill and submit form successfully', () => {
    FormFieldPage.fillNameField()
    FormFieldPage.fillPasswordField()
    FormFieldPage.selectRandomDrinks()
    FormFieldPage.selectRandomColor()
    FormFieldPage.selectRandomAutomationOption()
    FormFieldPage.validateAutomationToolsList()
    FormFieldPage.fillEmailField()
    FormFieldPage.fillMessageField()
    FormFieldPage.submitForm()
    FormFieldPage.validateAlert()
  })
})
