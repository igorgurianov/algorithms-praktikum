import React from "react";
import renderer from "react-test-renderer";

import { Button } from "./button";

it("Button component renders", () => {
  const btn = renderer.create(<Button text="123" />).toJSON();
  expect(btn).toMatchSnapshot();
});
