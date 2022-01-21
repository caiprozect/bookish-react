import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { findByText, render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import axios from "axios";

import store from "../store";
import BookDetailContainer from "./BookDetailContainer";

const renderWithProvider = (component) => {
  return {
    ...render(
      <Provider store={store}>
        <Router initialEntries={["/books/2"]}>
          <Routes>
            <Route path="/books/:id" element={component} />
          </Routes>
        </Router>
      </Provider>
    ),
  };
};

describe("BookDetailContainer", () => {
  it("renders", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8080/books/2").reply(200, {
      name: "Acceptance tests driven development with React",
      id: 2,
    });

    const { findAllByText } = renderWithProvider(<BookDetailContainer />);

    const book = await findAllByText(
      "Acceptance tests driven development with React"
    );
    expect(book[1]).toBeInTheDocument();
  });
});
