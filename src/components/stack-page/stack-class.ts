interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getSize: () => number;
  getContainer: () => T[];
  getTop: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  private top: number = -1;

  push = (item: T): void => {
    this.container[this.getSize()] = item;
    this.top++;
  };

  pop = (): void => {
    if (this.getSize() !== 0 && this.top !== -1) {
      this.container.pop();
      this.top--;
    }
  };

  peak = (): T | null => {
    if (this.getSize() !== 0) {
      return this.container[this.getSize() - 1];
    }
    return null;
  };

  clear = (): void => {
    this.container = [];
    this.top = -1;
  };

  getContainer = (): T[] => {
    return this.container;
  };

  getSize = (): number => this.container.length;
  getTop = (): number => this.top;
}
