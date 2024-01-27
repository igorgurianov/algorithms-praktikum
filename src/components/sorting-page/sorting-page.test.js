import {
  selectionAscendingSort,
  selectionDescendingSort,
  bubbleAscendingSort,
  bubbleDescendingSort,
} from "./utils";
import { ElementStates } from "../../types/element-states";

describe("SORTING", () => {
  const singleElementArray = [{ value: 1, state: ElementStates.Default }];

  const threeElementsArray = [
    { value: 1, state: ElementStates.Default },
    { value: 3, state: ElementStates.Default },
    { value: 2, state: ElementStates.Default },
  ];

  const threeElementsArraySortedAsc = [
    { value: 1, state: ElementStates.Modified },
    { value: 2, state: ElementStates.Modified },
    { value: 3, state: ElementStates.Modified },
  ];
  const threeElementsArraySortedDesc = [
    { value: 3, state: ElementStates.Modified },
    { value: 2, state: ElementStates.Modified },
    { value: 1, state: ElementStates.Modified },
  ];

  // тесты с пустым массивом
  test("empty array ascending bubble", () => {
    expect(bubbleAscendingSort([])).toEqual([]);
  });
  test("empty array descending bubble", () => {
    expect(bubbleDescendingSort([])).toEqual([]);
  });
  test("empty array ascending select", () => {
    expect(selectionAscendingSort([])).toEqual([]);
  });
  test("empty array descending select", () => {
    expect(selectionDescendingSort([])).toEqual([]);
  });

  // тесты с массивом из одного элемента
  test("single element array descending bubble", () => {
    expect(bubbleDescendingSort(singleElementArray)).toEqual([
      [{ value: 1, state: ElementStates.Modified }],
    ]);
  });

  test("single element array ascending bubble", () => {
    expect(bubbleAscendingSort(singleElementArray)).toEqual([
      [{ value: 1, state: ElementStates.Modified }],
    ]);
  });

  test("single element array descending select", () => {
    expect(selectionDescendingSort(singleElementArray)).toEqual([
      [{ value: 1, state: ElementStates.Modified }],
    ]);
  });

  test("single element array ascending select", () => {
    expect(selectionAscendingSort(singleElementArray)).toEqual([
      [{ value: 1, state: ElementStates.Modified }],
    ]);
  });

  // тесты с массивом из нескольких элементов

  test("three elements array descending bubble", () => {
    const steps = bubbleDescendingSort(threeElementsArray);
    expect(steps[steps.length - 1]).toEqual(threeElementsArraySortedDesc);
  });

  test("three elements array ascending bubble", () => {
    const steps = bubbleAscendingSort(threeElementsArray);
    expect(steps[steps.length - 1]).toEqual(threeElementsArraySortedAsc);
  });

  test("three elements array descending select", () => {
    const steps = selectionDescendingSort(threeElementsArray);
    expect(steps[steps.length - 1]).toEqual(threeElementsArraySortedDesc);
  });

  test("three elements array ascending select", () => {
    const steps = selectionAscendingSort(threeElementsArray);
    expect(steps[steps.length - 1]).toEqual(threeElementsArraySortedAsc);
  });
});
