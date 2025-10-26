import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

const boxPage = require("../../fixtures/pages/boxPage.json");
const users = require("../../fixtures/users.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const generalElements = require("../../fixtures/pages/jeneral.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");

let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });


Given("user is on santa login page", function () {
  cy.visit("/login");
});

When("user logs in as {string} and {string}", function (string, string2) {
  cy.login(string, string2);
});

When("user logs in", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
});

When("user logs in with table", function (dataTable) {
  cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password)
});

When("user logs in as {string} and {string}", function (login, password) {
  cy.login(login, password);
});

Then("user is on dashboard page", function () {
  cy.get(".toggle-menu-wrapper > a").click();
});

Then("user enter name of box", function () {
  cy.get(boxPage.boxNameField).type(newBoxName);
});

Then("get boxname", function () {
  cy.get(":nth-child(3) > .frm")
    .invoke("val")
    .then((response) => {
      boxname = response;
      cy.log(boxname);
    });
  cy.get(generalElements.arrowRight).click();
});

Then("user choose icon", function () {
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click();
});

