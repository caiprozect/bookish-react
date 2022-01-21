import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";

import * as actions from "../../redux/actions";

const Review = ({ review }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(review.content);

  const dispatch = useDispatch();

  const clickHandler = () => {
    if (editing) {
      dispatch(actions.updateReview(review.id, { content }));
    }

    setEditing(!editing);
  };

  return (
    <div className="review">
      <span className="name">{review.name}</span>
      <span className="date">{review.date}</span>
      {!editing ? (
        <p className="content">{review.content}</p>
      ) : (
        <TextField
          name="content"
          label="Content"
          margin="normal"
          variant="outlined"
          multiline
          maxRows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        name="submit"
        onClick={clickHandler}
      >
        {!editing ? "Edit" : "Submit"}
      </Button>
    </div>
  );
};

export default Review;
