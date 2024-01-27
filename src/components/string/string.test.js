import {
  render,
  screen,
  fireEvent,
  getByTestId,
  queryByTestId,
  getAllByTestId,
  waitFor,
} from "@testing-library/react";

import { MemoryRouter, Router } from "react-router-dom";

import { StringComponent } from "./string";

describe("STRING ALGORYTHM", () => {
  let container, input, startBtn;

  beforeEach(() => {
    ({ container } = render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    ));
    input = getByTestId(container, "input");
    startBtn = getByTestId(container, "start algo");
  });

  test("even symbols", async () => {
    //Изначально обертки нет
    expect(queryByTestId(container, "circles box")).toBeNull;

    fireEvent.input(input, { target: { value: "qwe" } });
    fireEvent.click(startBtn);

    await waitFor(() => {
      const cirles = getAllByTestId(container, "circle-content");
      expect(cirles[0]).toHaveTextContent("e");
      expect(cirles[1]).toHaveTextContent("w");
      expect(cirles[2]).toHaveTextContent("q");
    });
  });

  test("odd symbols", async () => {
    expect(queryByTestId(container, "circles box")).toBeNull;

    fireEvent.input(input, { target: { value: "qw" } });
    fireEvent.click(startBtn);

    await waitFor(() => {
      const cirles = getAllByTestId(container, "circle-content");
      expect(cirles[0]).toHaveTextContent("w");
      expect(cirles[1]).toHaveTextContent("q");
    });
  });

  test("one symbol", async () => {
    expect(queryByTestId(container, "circles box")).toBeNull;

    fireEvent.input(input, { target: { value: "q" } });
    fireEvent.click(startBtn);

    await waitFor(() => {
      const cirles = getAllByTestId(container, "circle-content");
      expect(cirles[0]).toHaveTextContent("q");
    });
  });

  //Инпут пустой строки ограничен на уровне компонента в который зашит алгоритм, ожидаем circle === null
  test("empty input", async () => {
    expect(queryByTestId(container, "circles box")).toBeNull;

    fireEvent.input(input, { target: { value: "" } });
    fireEvent.click(startBtn);

    expect(screen.queryByTestId("circle-content")).toBeNull();
  });
});
