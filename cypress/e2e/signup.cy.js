import signup from "../Pages/SignupPage";
import SignupFactory from "../factories/SignupFactory";
import SignupPage from "../Pages/SignupPage";

describe("Signup", () => {
  /*beforeEach(function () {
    cy.fixture("deliver").then((d) => {
      this.deliver = d;
    });*/

  /*     before(function() {
        cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de Testes')

    })

    beforeEach(function(){
        cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
    })


    after(function() {
        cy.log('Tudo aqui é executado uma única vez DEPOIS os casos de Testes')
        
    })

    afterEach(function(){
        cy.log('Tudo aqui é executado uma única vez DEPOIS de CADA caso de teste')
    }) */

  it("User should be deliver", function () {
    let deliver = SignupFactory.deliver();
    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    const expectedMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
    signup.modalContentShouldBe(expectedMessage);
  });

  it("Incorrect document", function () {
    let deliver = SignupFactory.deliver();

    deliver.cpf = "000000141aa";

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMessageShouldBe("Oops! CPF inválido");
  });

  it("Incorrect email", function () {
    let deliver = SignupFactory.deliver();

    deliver.email = "user.com.br";

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMessageShouldBe("Oops! Email com formato inválido.");
  });

  context("Require fields", function () {
    const messages = [
      { field: "name", output: "É necessário informar o nome" },
      { field: "cpf", output: "É necessário informar o CPF" },
      { field: "email", output: "É necessário informar o email" },
      { field: "postalcode", output: "É necessário informar o CEP" },
      { field: "number", output: "É necessário informar o número do endereço" },
      { field: "delivery_method", output: "Selecione o método de entrega" },
      { field: "cnh", output: "Adicione uma foto da sua CNH" },
    ];

    before(function () {
      SignupPage.go();
      SignupPage.submit();
    });

    messages.forEach(function (msg) {
      it(`${msg.field} is required`, function () {
        SignupPage.alertMessageShouldBe(msg.output);
      });
    });
  });

  /*it("Require fields", function () {
    SignupPage.go();
    SignupPage.submit();
    SignupPage.alertMessageShouldBe("É necessário informar o nome");
    SignupPage.alertMessageShouldBe("É necessário informar o CPF");
    SignupPage.alertMessageShouldBe("É necessário informar o email");
    SignupPage.alertMessageShouldBe("É necessário informar o CEP");
    SignupPage.alertMessageShouldBe("É necessário informar o número do endereço");
    SignupPage.alertMessageShouldBe("Selecione o método de entrega");
    SignupPage.alertMessageShouldBe("Adicione uma foto da sua CNH");
  });*/
});
