describe('Als ik de applicatie open' , () => {
  it('Dan wordt de applicatie geopend', () => {
    cy.visit('http://localhost:5500/index.html')
  })
})

describe('Als ik een 3 x 3 speelbord aanmaak', () => {  
  it('Dan is een 3 x 3 speelbord aangemaakt', () => {
    cy.get('[data-cy=selectieSpeelbordGrootte]').select('3')
    cy.get('[data-cy=knopPlaatsSpeelbord]').click()
    cy.get('[data-cy=geplaatstBlokje').should('have.length', 9)
  })
  // testen of alle verschillende speelbord grootten worden aangemakt, kan pas als er een knop is met de functie om een nieuw speelbord aan te maken
  // it('Dan is een 4 x 4 speelbord aangemaakt', () => {
  //   cy.get('[data-cy=selectieSpeelbordGrootte]').select('4')
  //   cy.get('[data-cy=knopPlaatsSpeelbord]').click()
  //   cy.get('[data-cy=geplaatstBlokje').should('have.length', 16)
  // })
  // it('Dan is een 5 x 5 speelbord aangemaakt', () => {
  //   cy.get('[data-cy=selectieSpeelbordGrootte]').select('5')
  //   cy.get('[data-cy=knopPlaatsSpeelbord]').click()
  //   cy.get('[data-cy=geplaatstBlokje').should('have.length', 25)
  // })
  // it('Dan is een 6 x 6 speelbord aangemaakt', () => {
  //   cy.get('[data-cy=selectieSpeelbordGrootte]').select('6')
  //   cy.get('[data-cy=knopPlaatsSpeelbord]').click()
  //   cy.get('[data-cy=geplaatstBlokje').should('have.length', 36)
  // })
  // it('Dan is een 10 x 10 speelbord aangemaakt', () => {
  //   cy.get('[data-cy=selectieSpeelbordGrootte]').select('10')
  //   cy.get('[data-cy=knopPlaatsSpeelbord]').click()
  //   cy.get('[data-cy=geplaatstBlokje').should('have.length', 100)
  // })

  it('En is de knop en de selectie om het speelbord aan te maken verborgen', () => {
    cy.get('[data-cy=formSpeelbordSelectie]').should('not.be.visible')
  })
  
})

describe('Als ik een speelbord heb aangemaakt', () => {  
  it('Dan is de knop Sla op is beschikbaar', () => {
    cy.get('[data-cy=knopSpeelbordOpslaan]').should('be.visible')
  })
  it('En de knop toon opgeslagen speelborden is beschikbaar', () => {
    cy.get('[data-cy=knopToonOpgeslagenSpeelborden]').should('be.visible')
  })
  it('En de knop verwijder speelborden is beschikbaar', () => {
    cy.get('[data-cy=knopVerwijderSpeelborden]').should('be.visible')
  })
})

describe('Als ik het speelbord opsla', () => {
  it('Dan is het speelbord opgeslagen TODO!', () => {
    // TODO Local storage wordt voor iedere test leeg gemaakt door Cypress. De inhoud van local Storage kan niet worden gecontroleerd
  })
})

describe('Als ik de opgeslagen speelborden wil zien', () => {
  it('Dan worden de opgeslagen speelborden getoond TODO!', () => {
    // TODO Het scherm met de opgeslagen speelborden moet getoond worden
    cy.get('[data-cy=knopToonOpgeslagenSpeelborden]').click()
  })
})

describe('Als ik de opgeslagen speelborden verwijder', () => {
  it('Dan zijn de opgeslagen speelborden verwijderd TODO!', () => {
    // TODO Het scherm met de opgeslagen speelborden moet leeg zijn
    cy.get('[data-cy=knopToonOpgeslagenSpeelborden]').click()
  })
})