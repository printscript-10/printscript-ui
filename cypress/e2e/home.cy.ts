import { CreateSnippet } from "../../src/utils/snippet";

describe('Home', () => {
  beforeEach(() => {
    const auth0Username = Cypress.env('VITE_AUTH0_USERNAME');
    const auth0Password = Cypress.env('VITE_AUTH0_PASSWORD');

    cy.loginToAuth0(auth0Username, auth0Password);
  });

  it('Renders home', () => {
    const frontendUrl = Cypress.env('VITE_FRONTEND_URL'); // Use environment variable
    cy.visit(frontendUrl);

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiTypography-h6').should('have.text', 'Printscript');
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').should('be.visible');
    cy.get('.css-9jay18 > .MuiButton-root').should('be.visible');
    cy.get('.css-jie5ja').click();
    /* ==== End Cypress Studio ==== */
  });

  // You need to have at least 1 snippet in your DB for this test to pass
  it('Renders the first snippets', () => {
    const frontendUrl = Cypress.env('VITE_FRONTEND_URL'); // Use environment variable
    cy.visit(frontendUrl);
    const first10Snippets = cy.get('[data-testid="snippet-row"]');

    first10Snippets.should('have.length.greaterThan', 0);

    first10Snippets.should('have.length.lessThan', 10);
  });

  it('Can create snippet and find snippets by name', () => {
    const frontendUrl = Cypress.env('VITE_FRONTEND_URL');
    const backendUrl = Cypress.env('VITE_BACKEND_URL');

    cy.visit(frontendUrl);

    const snippetData = {
      name: "Test name",
      snippet: "println(1);",
      language: "PRINTSCRIPT",
    };

    cy.intercept('GET', `${backendUrl}/snippets*`, (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      });
    }).as('getSnippets');

    // Get the authentication token from localStorage
    cy.window().then((win) => {
      const token = win.localStorage.getItem('auth0_token');
      console.log(token)

      // Make the API request with the token in the headers
      cy.request({
        method: 'POST',
        url: `${backendUrl}/snippets`,
        body: snippetData,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        failOnStatusCode: false // Optional: set to true if you want the test to fail on non-2xx status codes
      }).then((response) => {
        console.log(response)
        expect(response.status).to.eq(200);

        expect(response.body.name).to.eq(snippetData.name);
        expect(response.body.content).to.eq(snippetData.snippet);
        expect(response.body.language).to.eq(snippetData.language);
        expect(response.body).to.haveOwnProperty("id");

        cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').clear();
        cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').type(snippetData.name + "{enter}");

        cy.wait("@getSnippets");
        cy.contains(snippetData.name).should('exist');
      });
    });
  });
});
