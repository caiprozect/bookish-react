import * as types from "../types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return { term: action.term };
    case types.FETCH_BOOKS_PENDING:
      return { ...state, loading: true };
    case types.FETCH_BOOKS_SUCCESS:
      if (action.books) {
        return { term: state.term, books: action.books };
      } else if (action.book) {
        return { book: action.book };
      }
      break;
    case types.FETCH_BOOKS_FAILED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default reducer;
