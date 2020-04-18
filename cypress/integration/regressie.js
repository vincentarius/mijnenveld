describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:5500/mijnenveld.html') // change URL to match your dev URL
  })
})

describe('Maakt een speelbord aan', () => {
  it('maakt een speelbord aan', () => {
    cy.get('[data-cy=plaatsSpeelbord]').click()
    cy.get('canvas').should('be.visible')
  })
})

describe('Verbergt de knop aanmaken speelbord', () => {
  it('verbergt de knop na het aanmaken van een speelbord', () => {
  cy.get('[data-cy=plaatsSpeelbord]').should('not.be.visible')
  })
})