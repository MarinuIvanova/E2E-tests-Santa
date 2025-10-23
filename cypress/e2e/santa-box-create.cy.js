const users = require("../fixtures/users.json");
const loginPage = require("../fixtures/pages/loginPage.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const generalElements = require("../fixtures/pages/jeneral.json");
const invitePage = require("../fixtures/pages/invitePage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //const password = "test12345";
  //const email = "marinagubina37+1@gmail.com";
  //const userName = "Marina";

  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку

  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let boxname;
  let minAmount = 10;
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.get(loginPage.loginField).type(users.userAutor.email);
    cy.get(loginPage.passwordField).type(users.userAutor.password);
    cy.get(generalElements.submitButton).click({ forse: true });

    cy.contains("Создать коробку").should("exist");
    cy.contains("Создать коробку").click({ force: true });
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(":nth-child(3) > .frm")
      .invoke("val")
      .then((response) => {
        boxname = response;
        cy.log(boxname);
      });
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.minAmount).type(minAmount);
    cy.get(boxPage.maxAmount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click({ force: true });
    //cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("УчастникиМоя карточкаПодопечный");
      });
  });

  it("add participants", () => {
    cy.get(generalElements.submitButton).click({ forse: true });
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });
  it("approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click({ forse: true });
    cy.contains("войдите").click()
  });
});
