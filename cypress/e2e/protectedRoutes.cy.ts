
describe('Protected routes test', () => {
  it('should redirect to login when accessing a protected route unauthenticated', () => {
    // Visit the protected route
    cy.visit('/');

    cy.wait(1000)

    // Check if the URL is redirected to the login page
    cy.url().should('include', '/login');
  });

  it('should display login content', () => {
    // Visit the login page
    cy.visit('/login');

    // Look for text that is likely to appear on a login page
    cy.contains('Log in').should('exist');
    cy.contains('Password').should('exist'); // Adjust the text based on actual content
  });

  it('should not redirect to login when the user is already authenticated', () => {
    cy.loginToAuth0(
        Cypress.env("VITE_AUTH0_USERNAME"),
        Cypress.env("VITE_AUTH0_PASSWORD")
    )

    cy.visit('/');

    cy.wait(1000)

    // Check if the URL is redirected to the login page
    cy.url().should('not.include', '/login');
  });

})
