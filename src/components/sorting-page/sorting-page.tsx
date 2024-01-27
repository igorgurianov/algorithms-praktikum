import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { generateRandomArr } from "../../utils/randomArr";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { TSortingElement } from "../../types/string";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { algoritmHandler } from "./utils";

export enum AlgorithmTypes {
  Bubble = "bubble",
  Choice = "choice",
}

export const SortingPage: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmTypes>(
    AlgorithmTypes.Choice
  );
  const intervalId = useRef<NodeJS.Timeout>();

  const [randomArray, setRandomArray] = useState<TSortingElement[]>([]);
  const [sortedArray, setSrotedArray] = useState([]);
  const [stepsList, setStepsList] = useState<TSortingElement[][]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [algorithmDirection, setalgorithmDirection] =
    useState<Direction | null>(null);

  const isLoading = currentStep < stepsList.length - 1;

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
    setCurrentStep(0);
    setStepsList([arayWithStates]);
    setRandomArray(arayWithStates);
  };

  const handleSortingButton = (direction: Direction) => {
    setalgorithmDirection(direction);
    const steps = algoritmHandler(randomArray, direction, algorithm);

    if (!steps) return;
    setCurrentStep(0);
    setStepsList(steps);

    intervalId.current = setInterval(() => {
      if (steps.length) {
        setCurrentStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep > steps.length - 1 && intervalId.current) {
            clearInterval(intervalId.current);
            return currentStep;
          }
          return nextStep;
        });
      }
    }, SHORT_DELAY_IN_MS);
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
            isLoader={isLoading && algorithmDirection === Direction.Ascending}
            disabled={isLoading}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => handleSortingButton(Direction.Descending)}
            isLoader={
              isLoading && algorithmDirection === Direction.Descending
                ? true
                : false
            }
            disabled={isLoading}
          />
        </div>
        <div className={styles.arrayGenerationButton}>
          <Button
            text="Новый массив"
            onClick={() => handleRandomArr()}
            disabled={isLoading}
          />
        </div>
      </div>
      {stepsList.length > 0 && (
        <ul className={styles.vizBox}>
          {stepsList[currentStep]?.map((item, index) => {
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
