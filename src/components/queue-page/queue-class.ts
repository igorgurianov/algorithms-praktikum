interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number, initialState: T) {
    this.size = size;
    this.container = Array.from({ length: size }, () => ({ ...initialState }));
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;
    this.length--;
    this.head++;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size]; // Ваш код
  };

  getContainer = () => {
    return this.container;
  };

  clear = (size: number, initialState: T) => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array.from({ length: size }, () => ({ ...initialState }));
  };

  isEmpty = () => this.length === 0;

  getHead = (): number => {
    return this.head;
  };
  getTail = () => {
    return this.tail;
  };

  getTailElement = () => {
    return this.container[this.getTail() - 1];
  };
}
