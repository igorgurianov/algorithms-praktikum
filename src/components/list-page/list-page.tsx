import React, { useEffect, useState, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./list-class";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

interface IInputState {
  value: string;
  index: number | null;
}

interface IMovingEl extends IInputState {
  state: ElementStates;
}

interface IListEl {
  value: string;
  state: ElementStates;
}

export enum PositionSmCircle {
  top = "top",
  bottom = "bottom",
}

const initialState: string[] = ["0", "34", "8", "1"];

export const ListPage: React.FC = () => {
  const [input, setInput] = useState<IInputState>({ value: "", index: null });
  const [loading, setLoading] = useState({
    removingFromHead: false,
    removingFromTail: false,
    addingToHead: false,
    addingToTail: false,
    addingByIndex: false,
    removingByIndex: false,
  });

  const [positionSmallCircle, setPositionSmallCircle] =
    useState<PositionSmCircle>(PositionSmCircle.top);

  const [movingEl, setMovingEl] = useState<IMovingEl>({
    value: "",
    index: null,
    state: ElementStates.Changing,
  });

  const linkedList = useMemo(() => {
    const listClass = new LinkedList<string>();
    initialState.forEach((item: string) => {
      listClass.append(item);
    });
    return listClass;
  }, []);

  const [list, setList] = useState<IListEl[]>(() => [
    ...linkedList.getElements(),
  ]);

  const addToHead = async () => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      addingToHead: true,
    }));
    setPositionSmallCircle(PositionSmCircle.top);

    setMovingEl({
      value: input.value,
      index: 0,
      state: ElementStates.Changing,
    });
    //changeNodeState(0, ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.prepend(input.value);
    setMovingEl({ value: "", index: null, state: ElementStates.Changing });
    setList([...linkedList.getElements()]);
    changeNodeState(0, ElementStates.Modified);
    await delay(SHORT_DELAY_IN_MS);
    changeNodeState(0, ElementStates.Default);
    setLoading((prevLoading) => ({
      ...prevLoading,
      addingToHead: false,
    }));
    setInput({ value: "", index: null });
  };

  const addToTail = async () => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      addingToTail: true,
    }));
    setPositionSmallCircle(PositionSmCircle.top);
    setMovingEl({
      value: input.value,
      index: list.length - 1,
      state: ElementStates.Changing,
    });
    //changeNodeState(list.length, ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.append(input.value);
    setMovingEl({ value: "", index: null, state: ElementStates.Changing });
    setList([...linkedList.getElements()]);
    changeNodeState(list.length, ElementStates.Modified);
    await delay(SHORT_DELAY_IN_MS);
    changeNodeState(list.length, ElementStates.Default);
    setLoading((prevLoading) => ({
      ...prevLoading,
      addingToTail: false,
    }));
    setInput({ value: "", index: null });
  };

  const removeFromTail = async () => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      removingFromTail: true,
    }));
    setPositionSmallCircle(PositionSmCircle.bottom);
    setMovingEl({
      value: list[list.length - 1].value,
      index: list.length - 1,
      state: ElementStates.Changing,
    });
    changeNodeState(list.length - 1, ElementStates.Default, "");
    setList([...linkedList.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.removeTail();
    setMovingEl({ value: "", index: null, state: ElementStates.Changing });
    setList([...linkedList.getElements()]);
    setLoading((prevLoading) => ({
      ...prevLoading,
      removingFromTail: false,
    }));
    setInput({ value: "", index: null });
  };

  const removeFromHead = async () => {
    setPositionSmallCircle(PositionSmCircle.bottom);
    setLoading((prevLoading) => ({
      ...prevLoading,
      removingFromHead: true,
    }));
    setMovingEl({
      value: list[0].value,
      index: 0,
      state: ElementStates.Changing,
    });
    changeNodeState(0, ElementStates.Default, "");
    await delay(SHORT_DELAY_IN_MS);
    linkedList.removeHead();
    setList([...linkedList.getElements()]);
    setMovingEl({ value: "", index: null, state: ElementStates.Changing });
    setLoading((prevLoading) => ({
      ...prevLoading,
      removingFromHead: false,
    }));
    setInput({ value: "", index: null });
  };

  // ДОБАВИТЬ ПО ИНДЕКСУ

  const addByIndex = async () => {
    if (input.value && input.index != null) {
      setLoading((prevLoading) => ({
        ...prevLoading,
        addingByIndex: true,
      }));
      setPositionSmallCircle(PositionSmCircle.top);
      await moveCircles(input.index);
      //
      linkedList.insertAt(input.value, input.index);
      changeNodeState(input.index, ElementStates.Modified);
      setList([...linkedList.getElements()]);
      await delay(SHORT_DELAY_IN_MS);
      //changeNodeState(input.index, ElementStates.Default);
      resetNodesState(input.index);
      setList([...linkedList.getElements()]);
      setLoading((prevLoading) => ({
        ...prevLoading,
        addingByIndex: false,
      }));
      setInput({ value: "", index: null });
    }
  };

  // УДАЛИТЬ ПО ИНДЕКСУ
  const removeByIndex = async () => {
    if (input.index == null) return;
    setLoading((prevLoading) => ({
      ...prevLoading,
      removingByIndex: true,
    }));
    setPositionSmallCircle(PositionSmCircle.bottom);
    for (let i = 0; i < input.index; i++) {
      changeNodeState(i, ElementStates.Changing);
      await delay(SHORT_DELAY_IN_MS);
    }
    setMovingEl({
      value: list[input.index].value,
      index: input.index,
      state: ElementStates.Changing,
    });
    changeNodeState(input.index, ElementStates.Default, "");

    await delay(SHORT_DELAY_IN_MS);
    linkedList.deleteAtIndex(input.index);
    setList([...linkedList.getElements()]);
    setMovingEl({ value: "", index: null, state: ElementStates.Changing });
    resetNodesState(input.index - 1);
    setLoading((prevLoading) => ({
      ...prevLoading,
      removingByIndex: false,
    }));
    setInput({ value: "", index: null });
  };

  // ПЕРЕДВИЖЕНИЕ МАЛЕНЬКОГО КРУЖКА
  const moveCircles = async (index: number) => {
    for (let i = 0; i <= index; i++) {
      setMovingEl({
        value: input.value,
        index: i,
        state: ElementStates.Changing,
      });
      changeNodeState(i - 1, ElementStates.Changing);
      setList([...linkedList.getElements()]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setMovingEl({
      value: "",
      index: null,
      state: ElementStates.Changing,
    });
  };

  // ОБНОВИТЬ ЦВЕТ СРАЗУ У n НОД
  const resetNodesState = (index: number) => {
    for (let i = 0; i <= index; i++) {
      changeNodeState(i, ElementStates.Default);
    }
  };

  const changeNodeState = async (
    index: number,
    state: ElementStates = ElementStates.Default,
    value?: string
  ) => {
    const currNode = linkedList.getNodeAtIndex(index);
    if (currNode && state) {
      currNode.state = state;
    }
    if (currNode && value === "") {
      currNode.value = value;
    }

    setList([...linkedList.getElements()]);
  };

  const handleInput = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (type === "value") {
      setInput((prevInput) => ({
        ...prevInput,
        value: e.target.value,
      }));
    } else if (type === "index") {
      setInput((prevInput) => ({
        ...prevInput,
        index: parseInt(e.target.value),
      }));
    }
  };

  const isTail = (index: number) => {
    return index === linkedList.getTailIndex() &&
      !loading.removingFromTail &&
      !loading.removingByIndex
      ? "tail"
      : "";
  };

  const isHead = (index: number) => {
    return index === linkedList.getHeadIndex() &&
      !loading.addingToHead &&
      !loading.addingByIndex
      ? "head"
      : "";
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.setupBox}`}>
        <div className={styles.setupBar}>
          <div className={styles.input}>
            <Input
              placeholder="Введите значение"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInput("value", e)
              }
              value={input.value}
              maxLength={4}
            />
          </div>
          <Button
            text="Добавить в head"
            onClick={addToHead}
            isLoader={loading.addingToHead}
            disabled={!input.value ? true : false}
          />
          <Button
            text="Добавить в tail"
            onClick={addToTail}
            isLoader={loading.addingToTail}
            disabled={!input.value ? true : false}
          />
          <Button
            text="Удалить из head"
            onClick={removeFromHead}
            isLoader={loading.removingFromHead}
          />
          <Button
            text="Удалить из tail"
            onClick={removeFromTail}
            isLoader={loading.removingFromTail}
          />
        </div>
        <div className={styles.setupBar}>
          <div className={styles.input}>
            <Input
              placeholder="Введите индекс"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInput("index", e)
              }
              value={input.index ? input.index : ""}
              maxLength={1}
            />
          </div>
          <Button
            text="Добавить по индексу"
            extraClass={styles.flexButton}
            onClick={addByIndex}
            isLoader={loading.addingByIndex}
            disabled={input.value && input.index ? false : true}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.flexButton}
            onClick={removeByIndex}
            isLoader={loading.removingByIndex}
            disabled={input.index ? false : true}
          />
        </div>
      </div>
      {list && (
        <ul className={`${styles.vizBox}`}>
          {list.map((li, index) => {
            return (
              <li key={index}>
                <div>
                  <div className={styles.smCircleItem}>
                    {index === movingEl.index &&
                      positionSmallCircle === PositionSmCircle.top && (
                        <Circle
                          letter={movingEl.value}
                          isSmall
                          state={movingEl.state}
                        />
                      )}
                  </div>
                  <div className={styles.lgCircleBox}>
                    <Circle
                      letter={li.value}
                      index={index}
                      tail={isTail(index)}
                      head={isHead(index)}
                      state={li.state}
                    />
                    {index !== list.length - 1 ? <ArrowIcon /> : ""}
                  </div>
                  <div className={styles.smCircleItemBottom}>
                    {index === movingEl.index &&
                      positionSmallCircle === PositionSmCircle.bottom && (
                        <Circle
                          letter={movingEl.value}
                          isSmall
                          state={movingEl.state}
                        />
                      )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
