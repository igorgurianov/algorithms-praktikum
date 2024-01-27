import React, { useEffect } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queue-class";

type TQueue = {
  value?: string;
  head?: string;
  state: ElementStates;
};

const initialState: TQueue = {
  value: "",
  state: ElementStates.Default,
};

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState("");
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const [queue] = useState(new Queue<TQueue>(7, initialState)); // убедиться, что вызываем один и тот же инстанс класса
  const [queueItems, setqueueItems] = useState<(TQueue | null)[]>([]);

  useEffect(() => {
    setqueueItems(queue.getContainer());
  }, [queue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddBtn = async () => {
    setLoadingAdd(true);
    if (!input) return;
    queue.enqueue({ value: input, state: ElementStates.Changing });
    setInput("");
    setqueueItems([...queue.getContainer()]);
    await delay(SHORT_DELAY_IN_MS);

    const lastEl = queue.getTailElement();

    if (lastEl) {
      lastEl.state = ElementStates.Default;
    }

    setqueueItems([...queue.getContainer()]);
    setLoadingAdd(false);
  };

  const handleRemoveBtn = async () => {
    setLoadingRemove(true);
    if (!queueItems) return;

    const lastEl = queue.peak();
    if (lastEl) {
      lastEl.state = ElementStates.Changing;
    }
    setqueueItems([...queue.getContainer()]);
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setqueueItems([...queue.getContainer()]);
    setLoadingRemove(false);
  };

  const handleClearBtn = () => {
    queue.clear(7, initialState);
    setqueueItems([...queue.getContainer()]);
  };

  const checkForRemoval = (): boolean => {
    return queueItems.some((item) => item !== null && item?.value !== "")
      ? true
      : false;
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.setupBox}`}>
        <div className={`${styles.input}`}>
          <Input
            extraClass=""
            isLimitText
            maxLength={4}
            type="text"
            value={input}
            onChange={handleInputChange}
            data-testid="input"
          />
        </div>
        <Button
          text="Добавить"
          extraClass=""
          onClick={handleAddBtn}
          disabled={!Boolean(input) || queueItems[6]?.value !== ""}
          isLoader={loadingAdd}
          data-testid="add-button"
        />
        <Button
          text="Удалить"
          extraClass=""
          onClick={handleRemoveBtn}
          disabled={!checkForRemoval() || loadingAdd}
          isLoader={loadingRemove}
          data-testid="delete-button"
        />
        <div className={`${styles.clearBtn}`}>
          <Button
            text="Очистить"
            extraClass=""
            onClick={handleClearBtn}
            disabled={!queueItems.length || loadingAdd || loadingRemove}
            data-testid="clear-button"
          />
        </div>
      </div>
      {queueItems && (
        <ul className={styles.vizBox}>
          {queueItems.map((item, index) => {
            return (
              <li key={index}>
                <Circle
                  data-testid="circle-element"
                  state={item?.state}
                  letter={item?.value}
                  head={
                    item?.value != "" && index === queue.getHead() ? "head" : ""
                  }
                  tail={
                    item?.value != "" && index === queue.getTail() - 1
                      ? "tail"
                      : ""
                  }
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
