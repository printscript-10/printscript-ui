describe('Add snippet tests', () => {
  // Before each test, use the environment variables from Cypress
  beforeEach(() => {
    const auth0Username = Cypress.env('VITE_AUTH0_USERNAME');
    const auth0Password = Cypress.env('VITE_AUTH0_PASSWORD');

    cy.loginToAuth0(auth0Username, auth0Password);
  });

  it('Can add snippets manually', () => {
    const backendUrl = Cypress.env('VITE_BACKEND_URL');  // Access backend URL

    cy.visit("/");

    cy.intercept('POST', `${backendUrl}/snippets`, (req) => {
      req.reply((res) => {
        expect(res.body).to.include.keys("id", "name", "content", "language");
        expect(res.statusCode).to.eq(200);
      });
    }).as('postRequest');

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-9jay18 > .MuiButton-root').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#name').type('Some snippet name');
    cy.get('#demo-simple-select').click();
    cy.get('[data-testid="menu-option-PRINTSCRIPT"]').click();

    cy.get('[data-testid="add-snippet-code-editor"]').click();
    cy.get('[data-testid="add-snippet-code-editor"]').type(`const snippet: string = "some snippet"; \n println(snippet);`);

    cy.get('[data-testid="SaveIcon"]').click();

    cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
  });

  it('Can add snippets via file', () => {
    const backendUrl = Cypress.env('VITE_BACKEND_URL');  // Access backend URL

    cy.visit("/");

    cy.intercept('POST', `${backendUrl}/snippets`, (req) => {
      req.reply((res) => {
        expect(res.body).to.include.keys("id", "name", "content", "language");
        expect(res.statusCode).to.eq(200);
      });
    }).as('postRequest');

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="upload-file-input"]').selectFile("cypress/fixtures/example_ps.ps", { force: true });
    cy.wait(5000);

    cy.get('[data-testid="SaveIcon"]').click();

    cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
  });
});
