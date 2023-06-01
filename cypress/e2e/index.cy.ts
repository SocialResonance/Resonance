describe('The Home page', () => {
  beforeEach(() => {
    cy.visit('/') // Visit the index page
  })

  it('should display the title', () => {
    cy.get('h1').contains('Social Resonance')
  })

  it('should display Register link and direct to /register', () => {
    cy.get('p a').contains('Register').should('have.attr', 'href', '/register')
  })

  it('should display About link and direct to /about', () => {
    cy.get('p a').contains('About').should('have.attr', 'href', '/about')
  })
})
