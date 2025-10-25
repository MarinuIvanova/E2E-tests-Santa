import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
//import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
const users = require("../../fixtures/users.json");

Given("user is on santa login page", function () {
  cy.visit("/login");
});

When("user logs in", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
});

Then("user is on dashboard page", function () {
  cy.get(".toggle-menu-wrapper > a").click();
});
