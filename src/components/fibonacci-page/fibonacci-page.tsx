import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useState } from "react";
import styles from "./fibonacci.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/delay";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [inputNumber, setInputNumber] = useState(0);
  const [inProgress, SetInProgress] = useState(false);
  const [validation, setValidation] = useState(false);
  const [fibNumbers, setFibNumers] = useState<number[]>([]);

  useEffect(() => {
    if (inputNumber && inputNumber >= 1 && inputNumber <= 19) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [inputNumber]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setInputNumber(parseInt(e.target.value));
    } else {
      setInputNumber(0);
    }
    setInput(e.target.value);
  };

  const fibIterative = async () => {
    SetInProgress(true);
    try {
      let arr: number[] = [1, 1];
      for (let i = 2; i < inputNumber + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
        setFibNumers([...arr]);
        await delay(DELAY_IN_MS);
      }
    } finally {
      SetInProgress(false);
      setInput("");
    }
  };

  const handleStartAlgoritm = () => {
    fibIterative();
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${styles.setupBox}`}>
        <Input
          max={19}
          isLimitText
          type="number"
          value={input}
          onChange={handleInputChange}
          step="1"
          min={1}
        />
        <Button
          text="Рассчитать"
          extraClass="ml-6"
          onClick={handleStartAlgoritm}
          isLoader={inProgress}
          disabled={!validation || input === ""}
        />
      </div>
      {fibNumbers && (
        <ul
          className={`${styles.vizBox}`}
          style={fibNumbers.length > 10 ? { justifyContent: "flex-start" } : {}}
        >
          {fibNumbers.map((item, index) => {
            return (
              <li key={index}>
                <Circle letter={item.toString()} index={index} />
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
