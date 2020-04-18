describe('My First Test', () => {
    it('vind de knop om een speelbord aan te maken', () => {
      cy.contains('button').click()
    })
  })