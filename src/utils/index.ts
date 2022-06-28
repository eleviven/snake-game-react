import { PIXEL_SIZE } from "../constants";
import { ICoords } from "../types";

export const numWithPx = (num: number): string => {
  return `${num}px`;
};

export const generateRandomCoords = (size: number): ICoords => {
  return {
    x: Math.floor(Math.random() * size) * PIXEL_SIZE,
    y: Math.floor(Math.random() * size) * PIXEL_SIZE,
  };
};
