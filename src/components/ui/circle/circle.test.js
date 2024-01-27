import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("CIRCLE", () => {
  test("render w/o letter", () => {
    const el = renderer.create(<Circle />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ letter", () => {
    const el = renderer.create(<Circle letter="Q" />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ letter head", () => {
    const el = renderer.create(<Circle head={0} />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ react el head", () => {
    const el = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ text tail", () => {
    const el = renderer.create(<Circle tail="Q" />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ react el tail", () => {
    const el = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ react el tail", () => {
    const el = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ index", () => {
    const el = renderer.create(<Circle index={0} />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ small", () => {
    const el = renderer.create(<Circle isSmall />).toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ default state", () => {
    const el = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ changing state", () => {
    const el = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(el).toMatchSnapshot();
  });
  test("render w/ modified state", () => {
    const el = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(el).toMatchSnapshot();
  });
});
