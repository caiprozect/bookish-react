import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions";

import ReviewList from "./BookReview/ReviewList";
import ReviewForm from "./BookReview/ReviewForm";

const getDescriptionFor = (book = { name: "", description: "" }) => {
  return book.description
    ? book.description.length > 300
      ? `${book.description.slice(0, 300)}...`
      : book.description
    : book.name;
};

const BookDetail = ({ book = { name: "", description: "" } }) => {
  const formattedDesc = getDescriptionFor(book);

  return (
    <div className="detail">
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description">{formattedDesc}</p>
      {formattedDesc.substring(formattedDesc.length - 3) === "..." ? (
        <a className="show-more">Show more</a>
      ) : null}

      <ReviewForm id={book.id} />

      {book.reviews && <ReviewList reviews={book.reviews} />}
    </div>
  );
};

export default BookDetail;
