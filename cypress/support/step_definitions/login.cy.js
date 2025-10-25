import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { da } from "@faker-js/faker";
//import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
const users = require("../../fixtures/users.json");

Given("user is on santa login page", function () {
  cy.visit("/login");
});

/*When("user logs in as {string} and {string}", function (string, string2) {
  cy.login(string, string2);
});

When("user logs in", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
});

When("user logs in with table", function (dataTable) {
  cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password)
});*/

When("user logs in as {string} and {string}", function (login, password) {
  cy.login(login, password);
});

Then("user is on dashboard page", function () {
  cy.get(".toggle-menu-wrapper > a").click();
});
