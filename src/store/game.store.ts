import create from "zustand";
import { BOARD_SIZE, DIRECTIONS, PIXEL_SIZE } from "../constants";
import { ICoords } from "../types";
import { generateRandomCoords } from "../utils";

export interface IGameStore {
  status: boolean;
  direction: null | keyof typeof DIRECTIONS;
  snakeTails: ICoords[];
  appleCoords: null | ICoords;
  setStatus: (params: boolean) => void;
  initGame: () => void;
  moveSnake: () => void;
  setDirection: (params: keyof typeof DIRECTIONS) => void;
  createApple: () => void;
  checkIfEat: () => boolean | ICoords;
  eatApple: () => void;
}

export const useGameStore = create<IGameStore>((set, get) => ({
  // values
  status: false,
  direction: null,
  snakeTails: [],
  appleCoords: null,
  // actions
  setStatus: (status: boolean) => set(() => ({ status })),
  initGame: () =>
    set(() => ({
      status: false,
      direction: null,
      snakeTails: [
        { x: 0, y: 0 },
        { x: PIXEL_SIZE, y: 0 },
      ],
      appleCoords: generateRandomCoords(BOARD_SIZE),
    })),
  setDirection: (payload) => set(() => ({ direction: payload })),
  moveSnake: () =>
    set((state) => {
      const tails = [...state.snakeTails];
      let head = JSON.parse(JSON.stringify(tails[tails.length - 1]));
      console.log(head);

      switch (state.direction) {
        case DIRECTIONS.RIGHT:
          head.x += PIXEL_SIZE;
          break;
        case DIRECTIONS.LEFT:
          head.x -= PIXEL_SIZE;
          break;
        case DIRECTIONS.DOWN:
          head.y += PIXEL_SIZE;
          break;
        case DIRECTIONS.UP:
          head.y -= PIXEL_SIZE;
          break;
      }

      tails.shift();
      tails.push(head);
      return {
        snakeTails: tails,
      };
    }),
  createApple: () =>
    set(() => ({
      appleCoords: generateRandomCoords(BOARD_SIZE),
    })),
  eatApple: () =>
    set((state) => {
      const tails = [...state.snakeTails];
      if (state.appleCoords) {
        tails.unshift({ x: state.appleCoords?.x, y: state.appleCoords?.y });
      }
      get().createApple();
      return {
        snakeTails: tails,
      };
    }),
  checkIfEat: () => {
    const { snakeTails, appleCoords } = get();
    const isEated = snakeTails.some(
      (tail) => tail.x === appleCoords?.x && tail.y === appleCoords.y
    );
    if (isEated) {
      get().eatApple();
    }
    return isEated && appleCoords ? appleCoords : false;
  },
}));
