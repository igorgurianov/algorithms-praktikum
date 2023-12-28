import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { generateRandomArr } from "../../utils/randomArr";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { TSortingElement } from "../../types/string";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

enum AlgorithmTypes {
  Bubble = "bubble",
  Choice = "choice",
}

export const SortingPage: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmTypes>(
    AlgorithmTypes.Choice
  );

  const [randomArray, setRandomArray] = useState<TSortingElement[]>([]);
  const [sortedArray, setSrotedArray] = useState([]);
  const [isLoading, setIsLoading] = useState<Direction | boolean>(false);

  const handleAlgorithmChange = (type: AlgorithmTypes) => {
    setAlgorithm(type);
  };

  useEffect(() => {
    handleRandomArr();
  }, []);

  const handleRandomArr = () => {
    const generatedArray = generateRandomArr();
    const arayWithStates = generatedArray.map((value) => ({
      value,
      state: ElementStates.Default,
    }));
    setRandomArray(arayWithStates);
  };

  const swap = (
    arr: TSortingElement[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const selectionAscendingSort = async (arr: TSortingElement[]) => {
    setIsLoading(Direction.Ascending);
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setRandomArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[j].value < arr[minInd].value) {
          arr[minInd].state = ElementStates.Default;
          minInd = j;
          arr[j].state = ElementStates.Changing;
          setRandomArray([...arr]);
        } else {
          arr[j].state = ElementStates.Default;
          setRandomArray([...arr]);
        }
      }
      swap(arr, i, minInd);
      arr[i].state = ElementStates.Modified;

      setRandomArray([...arr]);
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setRandomArray([...arr]);
    setIsLoading(false);
  };

  const bubbleAscendingSort = async (arr: TSortingElement[]) => {
    setIsLoading(Direction.Ascending);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setRandomArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[j].value > arr[j + 1].value) {
          [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setRandomArray([...arr]);
    }
    setIsLoading(false);
  };

  const bubbleDescendingSort = async (arr: TSortingElement[]) => {
    setIsLoading(Direction.Descending);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setRandomArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[j].value < arr[j + 1].value) {
          [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setRandomArray([...arr]);
    }
    setIsLoading(false);
  };

  const selectionDescendingSort = async (arr: TSortingElement[]) => {
    setIsLoading(Direction.Descending);
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i + 1; j < length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setRandomArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[j].value > arr[maxInd].value) {
          arr[maxInd].state = ElementStates.Default;
          maxInd = j;
          arr[j].state = ElementStates.Changing;
          setRandomArray([...arr]);
        } else {
          arr[j].state = ElementStates.Default;
          setRandomArray([...arr]);
        }
      }
      swap(arr, i, maxInd);
      arr[i].state = ElementStates.Modified;

      setRandomArray([...arr]);
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setRandomArray([...arr]);
    setIsLoading(false);
  };

  const handleSortingButton = (direction: Direction) => {
    if (
      direction === Direction.Ascending &&
      algorithm === AlgorithmTypes.Choice
    ) {
      selectionAscendingSort(randomArray);
    } else if (
      direction === Direction.Descending &&
      algorithm === AlgorithmTypes.Choice
    ) {
      selectionDescendingSort(randomArray);
    } else if (
      direction === Direction.Ascending &&
      algorithm === AlgorithmTypes.Bubble
    ) {
      bubbleAscendingSort(randomArray);
    } else if (
      direction === Direction.Descending &&
      algorithm === AlgorithmTypes.Bubble
    ) {
      bubbleDescendingSort(randomArray);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.setupBox}>
        <div className={styles.radioButtons}>
          <RadioInput
            label="Выбор"
            name="AlgorithmType"
            onChange={() => handleAlgorithmChange(AlgorithmTypes.Choice)}
            checked={algorithm === AlgorithmTypes.Choice ? true : false}
            value={AlgorithmTypes.Choice}
            disabled={isLoading ? true : false}
          />
          <RadioInput
            label="Пузырек"
            name="AlgorithmType"
            value={AlgorithmTypes.Bubble}
            checked={algorithm === AlgorithmTypes.Bubble ? true : false}
            onChange={() => handleAlgorithmChange(AlgorithmTypes.Bubble)}
            disabled={isLoading ? true : false}
          />
        </div>
        <div className={styles.directionButtons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => handleSortingButton(Direction.Ascending)}
            isLoader={isLoading === Direction.Ascending ? true : false}
            disabled={isLoading ? true : false}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => handleSortingButton(Direction.Descending)}
            isLoader={isLoading === Direction.Descending ? true : false}
            disabled={isLoading ? true : false}
          />
        </div>
        <div className={styles.arrayGenerationButton}>
          <Button
            text="Новый массив"
            onClick={() => handleRandomArr()}
            disabled={isLoading ? true : false}
          />
        </div>
      </div>
      {randomArray && (
        <ul className={styles.vizBox}>
          {randomArray.map((item, index) => {
            return (
              <li key={index}>
                <Column index={item.value} state={item.state} />
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
