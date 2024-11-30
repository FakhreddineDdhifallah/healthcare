import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import SubmitButton from "./SubmitButton";

describe("SubmitButton", () => {
  it("renders correctly", () => {
    render(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<SubmitButton onClick={handleClick}>Submit</SubmitButton>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<SubmitButton disabled>Submit</SubmitButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
