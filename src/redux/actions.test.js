import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";

import {
  setSearchTerm,
  fetchBooks,
  fetchABook,
  saveReview,
  updateReview,
} from "./actions";
import * as types from "../types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("BookListContainer related actions", () => {
  it("Sets the search keyword", () => {
    const term = "";
    const expected = {
      type: types.SET_SEARCH_TERM,
      term,
    };
    const action = setSearchTerm(term);
    expect(action).toEqual(expected);
  });

  it("Fetches data successfully", () => {
    const books = [
      { id: 1, name: "Refactoring" },
      { id: 2, name: "Domain-driven design" },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));

    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, books },
    ];
    const store = mockStore({ books: [] });

    return store.dispatch(fetchBooks("")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Fetch data with error", () => {
    const errMsg = "Something went wrong";

    axios.get = jest.fn().mockImplementation(() => {
      return Promise.reject({ message: errMsg });
    });

    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_FAILED, err: errMsg },
    ];
    const store = mockStore({ books: [] });

    return store.dispatch(fetchBooks("")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Search data with term", () => {
    const books = [
      { id: 1, name: "Refactoring" },
      { id: 2, name: "Domain-driven design" },
    ];

    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));

    const store = mockStore({ term: "domain" });

    return store.dispatch(fetchBooks()).then(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/books?q=domain"
      );
    });
  });

  it("Fetch book by id", () => {
    const book = { id: 1, name: "Refactoring" };
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));

    const store = mockStore({ list: { books: [], term: "" } });

    return store.dispatch(fetchABook(1)).then(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books/1");
    });
  });

  it("Saves a review for a book", () => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const review = {
      name: "Juntao Qiu",
      content: "Excellent work!",
    };
    axios.post = jest.fn().mockImplementation(() => Promise.resolve({}));

    const store = mockStore({ books: [], term: "" });

    return store.dispatch(saveReview(1, review)).then(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/books/1/reviews",
        JSON.stringify(review),
        config
      );
    });
  });

  it("Update a review for a book", () => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const review = {
      name: "Juntao Qiu",
      content: "Excellent work!",
    };

    axios.put = jest.fn().mockImplementation(() => Promise.resolve({}));
    const store = mockStore({ list: { books: [], term: "" } });

    return store.dispatch(updateReview(1, review)).then(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:8080/reviews/1",
        JSON.stringify(review),
        config
      );
    });
  });
});
