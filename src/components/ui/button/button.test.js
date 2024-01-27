import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./button";

describe("BUTTON", () => {
  it("Button w/ text", () => {
    const btn = renderer.create(<Button text="123" />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it("Button w/o text", () => {
    const btn = renderer.create(<Button />).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("Button disabled", () => {
    const btn = renderer.create(<Button disabled />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it("Button loading", () => {
    const btn = renderer.create(<Button isLoader />).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("Button callback", () => {
    window.alert = jest.fn();
    render(
      <Button text="button" onClick={() => window.alert("callback test")} />
    );
    const btn = screen.getByText("button");
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith("callback test");
  });
});
