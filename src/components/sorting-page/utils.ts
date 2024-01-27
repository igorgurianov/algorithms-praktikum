import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { TSortingElement } from "../../types/string";
import { AlgorithmTypes } from "./sorting-page";

const swap = (
  arr: TSortingElement[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

const copyArray = (array: TSortingElement[]) => array.map((el) => ({ ...el }));

export const algoritmHandler = (
  arr: TSortingElement[],
  direction: Direction,
  algorithm: AlgorithmTypes
) => {
  if (
    direction === Direction.Ascending &&
    algorithm === AlgorithmTypes.Choice
  ) {
    return selectionAscendingSort(arr);
  } else if (
    direction === Direction.Descending &&
    algorithm === AlgorithmTypes.Choice
  )
    return selectionDescendingSort(arr);
  else if (
    direction === Direction.Descending &&
    algorithm === AlgorithmTypes.Bubble
  ) {
    return bubbleDescendingSort(arr);
  } else if (
    direction === Direction.Ascending &&
    algorithm === AlgorithmTypes.Bubble
  ) {
    return bubbleAscendingSort(arr);
  }
};

export const selectionAscendingSort = (
  arr: TSortingElement[]
): TSortingElement[][] => {
  if (arr.length === 0) return [];
  const steps = [];
  const { length } = arr;

  for (let i = 0; i < length - 1; i++) {
    let minInd = i;
    arr[minInd].state = ElementStates.Changing;
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;
      steps.push(copyArray(arr));
      if (arr[j].value < arr[minInd].value) {
        minInd = j;
      }

      arr[j].state = ElementStates.Default;
    }
    swap(arr, i, minInd);
    arr[minInd].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;
    steps.push(copyArray(arr));
  }

  arr[arr.length - 1].state = ElementStates.Modified;
  steps.push(copyArray(arr));

  return steps;
};

export const selectionDescendingSort = (
  arr: TSortingElement[]
): TSortingElement[][] => {
  if (arr.length === 0) return [];
  const steps = [];
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      steps.push(copyArray(arr));
      if (arr[j].value > arr[maxInd].value) {
        maxInd = j;
      }

      arr[j].state = ElementStates.Default;
    }
    swap(arr, i, maxInd);
    arr[maxInd].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;
    steps.push(copyArray(arr));
  }
  arr[arr.length - 1].state = ElementStates.Modified;
  steps.push(copyArray(arr));
  return steps;
};

export const bubbleAscendingSort = (arr: TSortingElement[]) => {
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      steps.push(copyArray(arr));

      if (arr[j].value > arr[j + 1].value) {
        [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
      }
      arr[j].state = ElementStates.Default;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
    steps.push(copyArray(arr));
  }
  return steps;
};

export const bubbleDescendingSort = (
  arr: TSortingElement[]
): TSortingElement[][] => {
  const steps = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;

      steps.push(copyArray(arr));

      if (arr[j].value < arr[j + 1].value) {
        [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
      }
      arr[j].state = ElementStates.Default;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;

    steps.push(copyArray(arr));
  }
  return steps;
};
