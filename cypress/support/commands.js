import {sponsorBra, sponsorEua, sponsorFra, sponsorChi, sponsorPan, simplePassword, specialPassword, confirmationURL} from '../support/info';
import { fakerPT_BR } from '@faker-js/faker';



Cypress.Commands.add('login', (username, password) => {
    cy.get('#user').click().type(username);
    cy.get('#password').click().type(password);

    cy.get('#login-button-submit').click();
});

Cypress.Commands.add('switchLanguage', (language, index) => {
    cy.get("#public-container-button-language-selector").click();
  
    if (language) {
      cy.get("#menu-dropdown-item-" + index).should("have.text", language);
      cy.get("#menu-dropdown-item-" + index).click();
    } else {
      for (let i = 0; i < 4; i++) {
        if (i >= 1) cy.get("#public-container-button-language-selector").click();
        cy.get(`#menu-dropdown-item-${i}`).click();
      }
    }
});

Cypress.Commands.add('checkSocialMedia', () => {
    cy.get('a[href="https://www.instagram.com/b2club.oficial"]').should('exist').and('be.visible');
    cy.get('a[href="https://br.pinterest.com/B2Clube"]').should('exist').and('be.visible');
    cy.get('a[href="https://www.b2cstore.com.br"]').should('exist').and('be.visible');
});

Cypress.Commands.add('preRegister', (country) => {
  const sponsors = {
    bra: sponsorBra,
    eua: sponsorEua,
    fra: sponsorFra,
    chi: sponsorChi,
    pan: sponsorPan
  };

  const sponsor = sponsors[country];

  if (sponsor) {
    cy.visit(`register/${sponsor}`);
  }

  cy.get('#firstName').type(fakerPT_BR.person.firstName());
  cy.get('#lastName').type(fakerPT_BR.person.lastName());
  cy.get('#user').type(fakerPT_BR.internet.username());
  cy.get('#email').type(fakerPT_BR.internet.email());
  cy.get('#password').type(specialPassword);
  cy.get('#passwordConfirm').type(specialPassword);
  cy.get('#register-button-submit').click();
});

Cypress.Commands.add('getId', (username) => {
  const key =
    "2ca6ae025651908d898781cb6dab75498808131629c44e001f3f265473e5029d";

  cy.request({
    method: "GET",
    url: "https://api-homolog.b2.club/api/User/id",
    qs: {
      userName: username,
    },
    headers: {
      "x-external-access": key,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body.data);
  });
});

Cypress.Commands.add("emailConfirmation", (username) => {
  cy.getId(username).then((id) => {
    cy.request({
      method: "POST",
      url: "https://api-homolog.b2.club/api/Account/confirm-email",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.visit(confirmationURL + id);
  });

});