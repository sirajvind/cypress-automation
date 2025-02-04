import DelaysPage from '../pages/DelaysPage'

describe('Delays Feature Test', () => {
  beforeEach(() => {
    DelaysPage.visit()
  })

  it('displays Liftoff! after 10s delay', () => {
    DelaysPage.clickStartButton()
    DelaysPage.verifyLiftoffText()
  })
})
