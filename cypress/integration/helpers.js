export const gotoApp = () => {
  cy.visit("http://localhost:3000/");
};

export const checkAppTitle = (title) => {
  cy.get('h2[data-test="heading"]').contains(title);
};
