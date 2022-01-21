import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { Provider } from "react-redux";

import * as actions from "../../redux/actions";
import store from "../../store";
import Review from "./Review";

const renderWithProvider = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("Review", () => {
  it("renders", () => {
    const props = {
      review: {
        name: "Juntao",
        date: "2018/06/21",
        content: "Excellent work, really impressedy by your efforts",
      },
    };

    const { container } = renderWithProvider(<Review {...props} />);
    const review = container.querySelector(".review");

    expect(review.querySelector(".name").innerHTML).toEqual("Juntao");
    expect(review.querySelector(".date").innerHTML).toEqual("2018/06/21");
    expect(review.querySelector(".content").innerHTML).toEqual(
      "Excellent work, really impressedy by your efforts"
    );
  });

  it("editing", () => {
    const props = {
      review: {
        name: "Juntao",
        date: "2018/06/21",
        content: "Excellent work, really impressed by your efforts",
      },
    };

    const { getByText } = renderWithProvider(<Review {...props} />);
    const button = getByText("Edit");

    expect(button.innerHTML).toEqual("Edit");
    userEvent.click(button);
    expect(button.innerHTML).toEqual("Submit");
  });

  it("copy content to a textarea for editing", () => {
    const props = {
      review: {
        name: "Juntao",
        date: "2018/06/21",
        content: "Excellent work, really impressed by your efforts",
      },
    };

    const { getByText, container } = renderWithProvider(<Review {...props} />);
    const button = getByText("Edit");
    const content = container.querySelector("p.content");

    expect(content).toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"]')
    ).not.toBeInTheDocument();

    userEvent.click(button);

    expect(content).not.toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"]').innerHTML
    ).toEqual("Excellent work, really impressed by your efforts");
  });

  it("send requests", async () => {
    const fakeUpdateReview = () => {
      return () => {
        return Promise.resolve({});
      };
    };

    jest
      .spyOn(actions, "updateReview")
      .mockImplementation(() => fakeUpdateReview);

    const props = {
      review: {
        id: 123,
        name: "Juntao",
        date: "2018/06/21",
        content: "Excellent work, really impressed by your efforts",
      },
    };

    const { getByText, container } = renderWithProvider(<Review {...props} />);
    userEvent.click(getByText("Edit"));
    const content = container.querySelector('textarea[name="content"]');
    userEvent.clear(content);
    userEvent.type(content, "Fantastic work");
    userEvent.click(getByText("Submit"));

    expect(actions.updateReview).toHaveBeenCalledWith(123, {
      content: "Fantastic work",
    });
  });
});
