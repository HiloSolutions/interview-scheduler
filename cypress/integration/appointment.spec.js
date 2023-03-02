describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //click on add btn in second appt
    cy.get("[alt=Add]")
      .first()
      .click();
    //enter name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    //choose interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    //click save
    cy.contains("Save").click();
    //see booked appt
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it("should edit an interview", () => {
    //click on edit btn in second appt
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    //Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    //Clicks the save button
    cy.contains("Save").click();
    //Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });


  it("should cancel an interview", () => {
    //click on delete btn in second appt
    cy.get("[alt=Delete]")
      .click({ force: true });
    //clicks the confirm btn
    cy.contains("Confirm").click();
    //Sees that the appointment slot is empty
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");

  });

});



