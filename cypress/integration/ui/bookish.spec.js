import axios from "axios";

const gotoApp = () => {
  cy.visit("http://localhost:3000/");
};

const checkAppTitle = () => {
  cy.get('h2[data-test="heading"]').contains("Bookish");
};

const checkBookListWith = (expectation = []) => {
  cy.get('div[data-test="book-list"]').should("exist");
  cy.get("div.book-item").should((books) => {
    expect(books).to.have.length(expectation.length);

    const titles = [...books].map((book) => book.querySelector("h2").innerHTML);
    expect(titles).to.deep.equal(expectation);
  });
};

const checkBookList = () => {
  checkBookListWith([
    "Refactoring",
    "Domain-driven design",
    "Building Microservices",
    "Acceptance Test Driven Development with React",
  ]);
};

const checkSearchResult = () => {
  checkBookListWith(["Domain-driven design"]);
};

const gotoNthBookInTheList = (n) => {
  cy.get("div.book-item").contains("View Details").eq(n).click();
};

const checkBookDetail = () => {
  cy.url().should("include", "/books/1");
  cy.get("h2.book-title").contains("Refactoring");
};

const performSearch = (term) => {
  cy.get('[data-test="search"] input').type(term);
};

const composeReview = (name, content) => {
  cy.get('input[name="name"]').type(name);
  cy.get('textarea[name="content"]').type(content);
  cy.get('button[name="submit"]').click();
};

const checkReview = () => {
  cy.get('div[data-test="reviews-container"] .review').should("have.length", 1);
};

before(() => {
  return axios
    .delete("http://localhost:8080/books?_cleanup=true")
    .catch((err) => err);
});
describe("Bookish application", function () {
  beforeEach(() => {
    gotoApp();
  });
  afterEach(() => {
    return axios
      .delete("http://localhost:8080/books?_cleanup=true")
      .catch((err) => err);
  });

  it("Visit the bookish", function () {
    checkAppTitle();
  });

  it("Shows a book list", function () {
    checkBookList();
  });

  it("Goes to the detail page", () => {
    gotoNthBookInTheList(0);
    checkBookDetail();
  });

  it("Search for a title", () => {
    checkBookList();
    performSearch("design");
    checkSearchResult();
  });

  it("Write a review for a book", () => {
    gotoNthBookInTheList(0);
    checkBookDetail();

    composeReview("Juntao Qiu", "Excellent work!");
    checkReview();
  });
});
