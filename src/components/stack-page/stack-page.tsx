import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./stack-class";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TStackItem = {
  value: string;
  state: ElementStates;
};

export const StackPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const [stack] = useState(new Stack<TStackItem>()); // убедиться, что вызываем один и тот же инстанс класса стак
  const [stackItems, setStackItems] = useState<TStackItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddBtn = async () => {
    setLoadingAdd(true);
    if (!input) return;
    stack.push({ value: input, state: ElementStates.Changing });
    setInput("");
    setStackItems([...stack.getContainer()]);
    await delay(SHORT_DELAY_IN_MS);

    const lastEl = stack.peak();
    if (lastEl) {
      lastEl.state = ElementStates.Default;
    }

    setStackItems([...stack.getContainer()]);
    setLoadingAdd(false);
  };

  const handleRemoveBtn = async () => {
    setLoadingRemove(true);
    if (!stackItems) return;

    const lastEl = stack.peak();
    if (lastEl) {
      lastEl.state = ElementStates.Changing;
    }
    setStackItems([...stack.getContainer()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackItems([...stack.getContainer()]);
    setLoadingRemove(false);
  };

  const handleClearBtn = () => {
    stack.clear();
    setStackItems([...stack.getContainer()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.setupBox}`}>
        <div className={`${styles.input}`}>
          <Input
            extraClass=""
            isLimitText
            maxLength={4}
            type="text"
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <Button
          text="Добавить"
          extraClass=""
          onClick={handleAddBtn}
          disabled={!Boolean(input)}
          isLoader={loadingAdd}
        />
        <Button
          text="Удалить"
          extraClass=""
          onClick={handleRemoveBtn}
          disabled={!stackItems.length || loadingAdd}
          isLoader={loadingRemove}
        />
        <div className={`${styles.clearBtn}`}>
          <Button
            text="Очистить"
            extraClass=""
            onClick={handleClearBtn}
            disabled={!stackItems.length || loadingAdd || loadingRemove}
          />
        </div>
      </div>
      {stackItems && (
        <ul className={styles.vizBox}>
          {stackItems.map((item, index) => {
            return (
              <li key={index}>
                <Circle
                  state={item.state}
                  letter={item.value}
                  head={index === stack.getTop() ? "top" : ""}
                  index={index}
                />
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
