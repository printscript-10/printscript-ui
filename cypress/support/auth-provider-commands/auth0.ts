export function loginViaAuth0Ui(username: string, password: string) {
    // App landing page redirects to Auth0.
    cy.visit('/');

    // Retrieve environment variables for Auth0 domain
    const auth0Domain = Cypress.env('VITE_AUTH0_DOMAIN');  // Access Auth0 domain from Cypress env

    // Login on Auth0.
    cy.origin(
        auth0Domain,  // Use the domain from Cypress env
        { args: { username, password } },
        ({ username, password }) => {
            // Use the provided username and password to log in
            cy.get('input#username').type(username);
            cy.get('input#password').type(password, { log: false });
            cy.contains('button[value=default]', 'Continue').click();
        }
    );

    // Ensure Auth0 has redirected us back to the app
    cy.url().should('equal', 'http://localhost:5173/');
}
