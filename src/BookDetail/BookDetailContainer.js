import React, { useEffect } from "react";
import { useParams } from "react-router";
import BookDetail from "./BookDetail";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../redux/actions";

const BookDetailContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchABook(id));
  }, []);

  const book = useSelector((state) => state.book);

  return <BookDetail book={book} />;
};

export default BookDetailContainer;
