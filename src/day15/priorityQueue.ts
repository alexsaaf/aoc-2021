// Simple priority queue.
export interface PriorityQueue<T> {
  insert(item: T, priority: number): void;
  peek(): T | null;
  pop(): T | null;
  size(): number;
  isEmpty(): boolean;
}

// Creates a priority queue.
export const priorityQueue = <T>(): PriorityQueue<T> => {
  const data: [number, T][] = [];

  return {
    insert: (i, p) => {
      if (data.length == 0) {
        data.push([p, i]);
        return;
      }

      for (let index = 0; index < data.length; index++) {
        if (index == data.length - 1) {
          data.push([p, i]);
          return;
        }

        if (data[index][0] < p) {
          data.splice(index, 0, [p, i]);
          return;
        }
      }
    },

    isEmpty: () => data.length == 0,

    peek: () => (data.length == 0 ? null : data[0][1]),

    size: () => data.length,

    pop: () => (data.length == 0 ? null : data.pop()![1]),
  };
};
