import React from "react";
import { render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";

import BookDetail from "./BookDetail";
import { Provider } from "react-redux";
import store from "../store";

const renderWithProvider = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("BookDetail", () => {
  it("renders title", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const title = container.querySelector(".book-title");
    expect(title.innerHTML).toEqual(props.book.name);
  });

  it("renders description", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques " +
          "that hundreds of thousands of developers have used to improve " +
          "their software.",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.description);
  });

  it("displays the book name when no description was given", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);

    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.name);
  });

  it("Shows *more* link when desctiption is too long", () => {
    const props = {
      book: {
        name: "Refactoring",
        description: "The book about how to do refactoring ".repeat(100),
      },
    };

    const { container } = renderWithProvider(<BookDetail {...props} />);
    const link = container.querySelector("a.show-more");
    const title = container.querySelector("p.book-description");

    expect(link.innerHTML).toEqual("Show more");
    expect(title.innerHTML).toEqual(
      `${props.book.description.slice(0, 300)}...`
    );
  });

  it("renders reviews", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
        reviews: [
          {
            name: "Juntao",
            date: "2018/06/21",
            content: "Excellent work, really impressed by your efforts",
          },
        ],
      },
    };

    const { container } = renderWithProvider(<BookDetail {...props} />);

    const reviews = container.querySelectorAll(
      '[data-test="reviews-container"] .review'
    );
    expect(reviews.length).toBe(1);
    expect(reviews[0].querySelector(".name").innerHTML).toEqual("Juntao");
    expect(reviews[0].querySelector(".date").innerHTML).toEqual("2018/06/21");
    expect(reviews[0].querySelector(".content").innerHTML).toEqual(
      "Excellent work, really impressed by your efforts"
    );
  });

  it("renders review form", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands developers have used to improve their software.",
      },
    };

    const { container } = renderWithProvider(<BookDetail {...props} />);

    const form = container.querySelector("form");
    const nameInput = container.querySelector('input[name="name"]');
    const contentTextArea = container.querySelector('textarea[name="content"]');
    const submitButton = container.querySelector('button[name="submit"]');

    expect(form).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(contentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
