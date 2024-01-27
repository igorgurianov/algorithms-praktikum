import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { TStringElement } from "../../types/string";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [input, SetInput] = useState("");
  const [inProgress, SetInProgress] = useState(false);
  const [inputArray, SetInputArray] = useState<TStringElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetInput(e.target.value);
  };

  const splitInitialString = (input: string): TStringElement[] => {
    const res: TStringElement[] = [];
    for (let i = 0; i < input.length; i++) {
      res.push({ value: input[i], state: ElementStates.Default });
    }
    return res;
  };

  const handleStartAlgoritm = () => {
    const inputArray = splitInitialString(input);
    algoritm(inputArray);
  };

  const swap = (
    arr: TStringElement[],
    firstIndex: number,
    secondIndex: number
  ) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const delay = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const algoritm = async (arr: TStringElement[]) => {
    SetInProgress(true);
    SetInputArray(arr);
    try {
      const middle = Math.floor(arr.length / 2);

      let j = arr.length - 1;
      for (let i = 0; i <= middle; i++) {
        if (arr.length % 2 === 0 && i === middle) {
          arr[i].state = ElementStates.Modified;
          return;
        }

        if (i === j) {
          arr[i].state = ElementStates.Modified;
          SetInputArray([...arr]);
          return;
        }
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        SetInputArray([...arr]);
        await delay();
        swap(arr, i, j);
        arr[i].state = ElementStates.Modified;
        arr[j].state = ElementStates.Modified;

        SetInputArray([...arr]);
        j--;
      }
    } catch (e) {
      console.log(e);
    } finally {
      SetInProgress(false);
      SetInput("");
    }
  };

  return (
    <SolutionLayout title="Строка" data-testid="string-page">
      <div className={styles.setupBox}>
        <Input
          maxLength={11}
          isLimitText
          value={input}
          onChange={handleInputChange}
          data-testid="input"
        />
        <Button
          text="Развернуть"
          data-testid="start algo"
          extraClass="ml-6"
          onClick={handleStartAlgoritm}
          isLoader={inProgress}
          disabled={input === "" ? true : false}
        />
      </div>

      {inputArray && (
        <ul className={`${styles.vizBox} mt-40`} data-testid="circles box">
          {inputArray.map((item, index) => {
            return (
              <li key={index}>
                <Circle
                  letter={item.value}
                  state={item.state}
                  data-testid="circle-content"
                />
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
