import { ElementStates } from "../../types/element-states";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  state: ElementStates;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
    this.state = ElementStates.Default;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
  prepend: (element: T) => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private elements: T[];

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.elements = [];
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        // перебрать элементы в списке до нужной позиции
        while (curr && currIndex < index - 1) {
          curr = curr.next;
          currIndex++;
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
        // добавить элемент
      }

      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
    this.tail = node;
    this.elements.push(element);
  }

  removeTail() {
    if (this.head === null) {
      return;
    }

    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
      return;
    }

    let curr = this.head;
    while (curr.next != null && curr.next.next != null) {
      curr = curr.next;
    }

    curr.next = null;
    this.size--;
    this.tail = curr;
    this.elements.pop();
  }

  deleteAtIndex(index: number) {
    if (index < 0 || index >= this.size) {
      console.log("Enter a valid index");
      return;
    }

    if (index === 0) {
      this.removeHead();
      return;
    }

    let curr = this.head;
    let prev = null;
    let currentIndex = 0;

    while (curr && currentIndex < index) {
      prev = curr;
      curr = curr.next;
      currentIndex++;
    }

    if (prev && curr) {
      prev.next = curr.next;

      if (!curr.next) {
        this.tail = prev;
      }

      this.size--;
      this.elements.splice(index, 1);
    }
  }

  prepend(element: T) {
    const node = new Node(element);
    node.next = this.head;
    this.head = node;
    this.size++;

    if (!this.tail) {
      this.tail = node;
    }

    this.elements = [element, ...this.elements];
  }

  removeHead() {
    if (!this.head) {
      return;
    }
    if (this.head && this.head.next) {
      this.head = this.head.next;
      this.size--;
    }
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }

  getElements(): Node<T>[] {
    let curr = this.head;
    const elements: Node<T>[] = [];

    while (curr) {
      elements.push(curr);
      curr = curr.next;
    }

    return elements;
  }

  getTailIndex(): number | null {
    if (!this.tail) {
      return null;
    }

    let curr = this.head;
    let index = 0;

    while (curr && curr !== this.tail) {
      curr = curr.next;
      index++;
    }

    return index;
  }

  getHeadIndex(): number | null {
    if (!this.head) {
      return null;
    }

    let curr: Node<T> | null = this.head;
    let index = 0;

    while (curr) {
      if (curr === this.head) {
        return index;
      }
      curr = curr.next;
      index++;
    }

    return null;
  }

  printWithNext() {
    let curr = this.head;
    let res = "";

    while (curr) {
      res += `{ value: ${curr.value}, next: ${
        curr.next ? curr.next.value : null
      } } `;
      curr = curr.next;
    }

    return res;
  }

  getNodeAtIndex(index: number): Node<T> | null {
    let current = this.head;
    let currentIndex = 0;

    while (current && currentIndex < index) {
      current = current.next;
      currentIndex++;
    }

    return current;
  }
}

//const list = new LinkedList<number>();
