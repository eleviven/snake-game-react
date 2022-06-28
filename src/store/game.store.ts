import create from "zustand";
import {
  BOARD_SIZE,
  DIRECTIONS,
  DIRECTIONS_REVERSE,
  PIXEL_SIZE,
} from "../constants";
import { GAME_STATUSES, ICoords } from "../types";
import { generateRandomCoords } from "../utils";

export interface IGameStore {
  status: GAME_STATUSES;
  direction: null | keyof typeof DIRECTIONS;
  snakeTails: ICoords[];
  appleCoords: null | ICoords;
  score: number;
  setStatus: (params: GAME_STATUSES) => void;
  initGame: () => void;
  moveSnake: () => void;
  setDirection: (params: keyof typeof DIRECTIONS) => void;
  createApple: () => void;
  checkIfEat: () => boolean | ICoords;
  checkIfCross: () => boolean;
  checkIfBorder: () => boolean;
  eatApple: () => void;
}

export const useGameStore = create<IGameStore>((set, get) => ({
  // values
  status: GAME_STATUSES.STOP,
  direction: null,
  snakeTails: [],
  appleCoords: null,
  score: 0,
  // actions
  setStatus: (status: GAME_STATUSES) => set(() => ({ status })),
  initGame: () =>
    set(() => ({
      status: GAME_STATUSES.STOP,
      direction: null,
      snakeTails: [
        { x: 4 * PIXEL_SIZE, y: 4 * PIXEL_SIZE },
        { x: 5 * PIXEL_SIZE, y: 4 * PIXEL_SIZE },
      ],
      appleCoords: generateRandomCoords(BOARD_SIZE),
      score: 0,
    })),
  setDirection: (payload) => {
    const { direction } = get();
    const isReverse = direction && payload === DIRECTIONS_REVERSE[direction];

    if (!isReverse)
      set(() => {
        return { direction: payload };
      });
  },
  moveSnake: () =>
    set((state) => {
      const tails = [...state.snakeTails];
      let head = JSON.parse(JSON.stringify(tails[tails.length - 1]));

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
      tails.unshift({ x: state.snakeTails[0]?.x, y: state.snakeTails[0]?.y });
      get().createApple();
      return {
        snakeTails: tails,
        score: state.score + 1,
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
  checkIfCross: () => {
    const snakeTails = [...get().snakeTails];
    const head = snakeTails.pop();

    if (!head) return false;

    const crossedCoordsIndex = snakeTails.findIndex(
      (tail) => tail.x === head.x && tail.y === head.y
    );

    if (crossedCoordsIndex > 0) {
      const newSnakeTails = snakeTails.filter(
        (_, index) => index >= crossedCoordsIndex
      );
      set((state) => ({
        snakeTails: newSnakeTails,
        score: Math.floor(state.score / 2),
      }));
    }

    return false;
  },
  checkIfBorder: () => {
    const { setStatus } = get();
    const snakeTails = [...get().snakeTails];
    const head = snakeTails.pop();

    if (!head) return false;

    const isBorder =
      head.x < 0 ||
      head.x > BOARD_SIZE * PIXEL_SIZE - PIXEL_SIZE ||
      head.y < 0 ||
      head.y > BOARD_SIZE * PIXEL_SIZE - PIXEL_SIZE;

    if (isBorder) {
      setStatus(GAME_STATUSES.END);
    }

    return isBorder;
  },
}));
