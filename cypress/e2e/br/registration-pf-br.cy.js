import '../../support/commands';
import { specialPassword } from '../../support/info';
import { fakerPT_BR } from '@faker-js/faker';
var faker = require('faker-br');
const { cpf, cnpj } = require('cpf-cnpj-validator');


let username = faker.internet.userName();
// Pre-registration
describe('Pré-cadastro', () => {

    it('deve realizar pré-cadastro com sucesso', () => {
        cy.visit('register/aleatorios');
        cy.switchLanguage('Português', 0);

        cy.get('#firstName').type(faker.name.firstName());
        cy.get('#lastName').type(faker.name.lastName());
        cy.get('#user').type(username);
        cy.get('#email').type(faker.internet.email());
        cy.get('#password').type(specialPassword);
        cy.get('#passwordConfirm').type(specialPassword);

        cy.get('#register-button-submit').click();

        cy.contains('Confirme seu e-mail').should('be.visible');
    });

    it('deve confirmar e-mail com sucesso', () => {
       cy.emailConfirmation(username);
       cy.switchLanguage('Português', 0);
       cy.contains('E-mail Confirmado!').should('be.visible');
    });

    it('deve realizar cadastro PF com sucesso', () => {
        cy.visit('/');
        cy.switchLanguage('Português', 0);
        cy.login(username, specialPassword);

        //Step 1
        cy.get('#approval-process-start-step-input-registration-type').select('1');
        cy.get('#next-button').click();

        //Step 2
        cy.get('#cpf-field').type(faker.br.cpf());
        cy.get('#cellphone-field input').type(`+055 (${fakerPT_BR.phone.number('##')}) 9${fakerPT_BR.phone.number('9###-####')}`);
        cy.get('#next-button').click();

        //Step 3
        cy.get('#root > div > div:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div > div > div:nth-child(1) > div > div > input')
            .type('80030-001');
        cy.get('#input-adress-autocomplete-button-search-zipcode').click();
        cy.get('#input-address-2').type('1740');
        cy.get('#next-button').click();

        //Step 4
        cy.get('#input-Instagram').type(username);
        cy.get('#next-button').click();

        //Step 5
        cy.get('#financialPasswordcode-1').type('1');
        cy.get('#financialPasswordcode-2').type('2');
        cy.get('#financialPasswordcode-3').type('3');
        cy.get('#financialPasswordcode-4').type('4');
        cy.get('#financialPasswordcode-5').type('5');
        cy.get('#financialPasswordcode-6').type('6');

        cy.get('#financialPasswordConfirmcode-1').type('1');
        cy.get('#financialPasswordConfirmcode-2').type('2');
        cy.get('#financialPasswordConfirmcode-3').type('3');
        cy.get('#financialPasswordConfirmcode-4').type('4');
        cy.get('#financialPasswordConfirmcode-5').type('5');
        cy.get('#financialPasswordConfirmcode-6').type('6');
    
        cy.get('#next-button').click();

        cy.wait(5000)
        cy.get('#approval-process-contract-button-sign-contract').click();
        cy.contains('Perfil em análise').should('be.visible');
    });

});

