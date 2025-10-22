const users = require("../fixtures/users.json")
const loginPage = require("../fixtures/pages/loginPage.json")
const boxPage = require("../fixtures/pages/boxPage.json")
import {faker} from "@faker-js/faker"

describe('user can create a box and run it', () => {
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

  let newBoxName = faker.word({ length: { min: 5, max: 10 }})

  it('user logins and create a box', () => {
    cy.visit('/login')
    cy.get(loginPage.passwordField).type(users.userAutor.password)
    cy.get(loginPage.submitButton).click({forse: true})
    cy.contains("Создать коробку").click()
    cy.get(boxPage.boxNameField).type(newBoxName)
  })
})