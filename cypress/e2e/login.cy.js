import '../support/commands';
import {influencer, specialPassword} from '../support/info';


describe('Funcionalidade de Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Realiza login com credenciais válidas e redireciona para a homepage', () => {
    cy.login(influencer, specialPassword)
    cy.location('pathname').should('equal', '/home')
  });

});

describe('Validação de layout da página de Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Deve apresentar input de usuário/email e senha', () => {
    cy.get('#user').should('exist').and('be.visible');
    cy.get('#password').should('exist').and('be.visible');
  });
  it('Deve apresentar botão de "Entrar"', () => {
    cy.get('#login-button-submit').should('exist').and('be.visible');
  });
  it('Deve apresentar link para recuperação de senha', () => {
    cy.get('#login-link-forgot-password').should('exist').and('be.visible');
  });
  it('Deve apresentar redes sociais B2C: Instagram, Pinterest e B2C Store', () => {
    cy.checkSocialMedia();
  });
});

describe('PT - Mensagens da página de Login', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.switchLanguage('Português', 0)
    });

    it('Deve apresentar mensagem de erro em português por preenchimento inválido de campos', () => {
      cy.login('invalido', '123')
      cy.contains('Usuário ou senha inválida!').should('be.visible')
    });

    it('Deve apresentar mensagem de erro em português se não preenchimento de usuário e senha', () => {
      cy.get('#login-button-submit').click();
      cy.contains('Usuário ou senha inválida!')
    });
});

describe('EN - Mensagens da página de Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.switchLanguage('Inglês', 1)
  });
  it('Deve apresentar mensagem de erro em inglês por preenchimento inválido de campos', () => {
    cy.login('invalido', '123')
    cy.contains('Invalid username or password!').should('be.visible');
  });

  it('Deve apresentar mensagem de erro em inglês se não preenchimento de usuário e senha', () => {
    cy.get('#login-button-submit').click();
    cy.contains('Invalid username or password!').should('be.visible');
  });
  
});

describe('FR - Mensagens da página de Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.switchLanguage('Francês', 2)
  });
  it('Deve apresentar mensagem de erro em francês por preenchimento inválido de campos', () => {
    cy.login('invalido', '123')
    cy.contains("Nom d'utilisateur ou mot de passe incorrect!").should('be.visible');
  });

  it('Deve apresentar mensagem de erro em francês se não preenchimento de usuário e senha', () => {
    cy.get('#login-button-submit').click();
    cy.contains("Nom d'utilisateur ou mot de passe incorrect!").should('be.visible');
  });
  
});

describe('ES - Mensagens da página de Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.switchLanguage('Español', 3)
  });
  it('Deve apresentar mensagem de erro em espanhol por preenchimento inválido de campos', () => {
    cy.login('invalido', '123')
    cy.contains('Nombre de usuario o contraseña no válidos!').should('be.visible');
  });

  it('Deve apresentar mensagem de erro em espanhol se não preenchimento de usuário e senha', () => {
    cy.get('#login-button-submit').click();
    cy.contains('Nombre de usuario o contraseña no válidos!').should('be.visible');
  });
  
});