import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../redux/actions";

const ReviewForm = ({ id }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  return (
    <form noValidate autoComplete="off">
      <TextField
        label="Name"
        name="name"
        margin="normal"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Content"
        name="content"
        margin="normal"
        variant="outlined"
        multiline
        maxRows="4"
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        name="submit"
        onClick={() => dispatch(actions.saveReview(id, { name, content }))}
      >
        Submit
      </Button>
    </form>
  );
};

export default ReviewForm;
