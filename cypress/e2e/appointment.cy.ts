describe("Appointment System", () => {
  beforeEach(() => {
    cy.visit("/appointments"); // adjust the path according to your routing
  });

  it("should open appointment modal", () => {
    cy.get('[data-testid="appointment-button"]').click();
    cy.get('[data-testid="appointment-modal"]').should("be.visible");
  });

  it("should submit appointment form", () => {
    cy.get('[data-testid="appointment-button"]').click();
    cy.get('[data-testid="date-input"]').type("2024-02-20");
    cy.get('[data-testid="time-input"]').type("14:00");
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="success-message"]').should("be.visible");
  });

  it("should handle file upload", () => {
    cy.get('[data-testid="file-upload"]').attachFile("test-file.pdf");
    cy.get('[data-testid="upload-success"]').should("be.visible");
  });
});
