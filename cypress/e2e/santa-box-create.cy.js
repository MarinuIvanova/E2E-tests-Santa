const users = require("../fixtures/users.json");

const boxPage = require("../fixtures/pages/boxPage.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const generalElements = require("../fixtures/pages/jeneral.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");

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
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    //cy.contains("Создать коробку").should("exist");
    //cy.contains("Создать коробку").click({ force: true });
    cy.get(".toggle-menu-wrapper > a").click();
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
    cy.get(generalElements.arrowRight).click({ force: true });
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
    cy.contains("войдите").click();
    cy.login(users.user1.email, users.user1.password);

    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contains("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  /*after("delete box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(":nth-child(1) > a.base--clickable > .user-card").click({ forse: true })
    cy.get('.layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button').click()
    cy.get('.layout-1__header-wrapper-fixed > .layout-1__header-secondary__menu > .header-secondary-menu > .organizer-menu > .organizer-menu__wrapper > :nth-child(5)').click()
    cy.get(':nth-child(2) > .form-page-group__main > .frm-wrapper > .frm').type("Удалить коробку")
    cy.get(".btn-service").click()
  });*/

  it("delete API", () => {
    cy.request({
      method: "DELETE",
      headers: {
        Cookie:
          "ym_uid=1756824473104161583; _ym_d=1756824473; adrcid=AQxFmfkHv5eU4M6KUUHQ6Zg; fid=e61acd2a-e14e-47d9-b3b5-fef060f4604c; ma_id=2396747201751546992321; __upin=mSZP555PA42krayxhwzOTQ; _ac_cid=0200007F707C6668571CBB6F027C1E1A; __ai_fp_uuid=d27a505e4f206e37%3A6; ma_id_api=UQQuiBLJWcjkJb3IZmA6afgfbSXABMoRUaNex7hBDEjnsjjjhV+FTkL0L/FD7IY/KyHnTtZNJjg9afVTWdXnU3k9/J/BFbucQ77BW87pXe8j/HB5V9ZgD1UdqdxvhSkRidRas88NUIapDnUSFNiMdaJZTLQLXMxJ3zSYOQdL2+Qszqy2hV3VSQvQMZBb7Pr9DIQGICo7fQtY6FibT/4ymqaIzqNKRLjQ9tYNrT46XwqUUxU5RbGgY9iU4UTcyakvCjG8JAHzuZGjn5s0/1UAOMWP0T0MJCuMTpm/HVKCy4gaILFbftGRUdKpk5iuM6cnCYTcCInYSrRiwlJ1soINzA==; _buzz_aidata=JTdCJTIydWZwJTIyJTNBJTIybVNaUDU1NVBBNDJrcmF5eGh3ek9UUSUyMiUyQyUyMmJyb3dzZXJWZXJzaW9uJTIyJTNBJTIyMTQxLjAlMjIlMkMlMjJ0c0NyZWF0ZWQlMjIlM0ExNzYxMTE0MzYwNTk5JTdE; _buzz_mtsa=JTdCJTIydWZwJTIyJTNBJTIyN2Q1OTdjOTkyYmNiMTVjY2QyOTViMDdhNzQwNzEwMDYlMjIlMkMlMjJicm93c2VyVmVyc2lvbiUyMiUzQSUyMjE0MS4wJTIyJTJDJTIydHNDcmVhdGVkJTIyJTNBMTc2MTExNDM2MDYxNyU3RA==; _ac_oid=56a401989ab9cecab3ba22731b1543aa%3A1761227344863; _ohmybid_cmf=2; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg0MTY5ODAsImlhdCI6MTc2MTI3NjU1OCwiZXhwIjoxNzYzODY4NTU4fQ.Gj-FhRTYQzOlDBReEMHmvZP6bJvgFos06M2VhpI_ag0; _ym_isad=2; acs_3=%7B%22hash%22%3A%221aa3f9523ee6c2690cb34fc702d4143056487c0d%22%2C%22nst%22%3A1761363729921%2C%22sl%22%3A%7B%22224%22%3A1761277329921%2C%221228%22%3A1761277329921%7D%7D; adrdel=1761277330149; domain_sid=lndwM-NG6CIjun_lNiXTt%3A1761277370500",
      },
      url: `https://santa-secret.ru/api/box/${boxname}`,
      //body: { currentPassword: "654321%", newPassword: "654321$" },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
