import { FC, PropsWithChildren } from "react";
import { PIXEL_SIZE, BOARD_SIZE } from "../../constants";
import { numWithPx } from "../../utils";

const Board: FC<PropsWithChildren> = ({ children }) => {
  const rows = createList();

  return (
    <div className="relative inline-block border-t border-l border-gray-700 bg-slate-800 overflow-hidden">
      {rows.map((row) => (
        <div key={row} className="flex">
          {rows.map((col) => (
            <div
              key={col}
              style={{
                height: numWithPx(PIXEL_SIZE),
                width: numWithPx(PIXEL_SIZE),
              }}
              className={`border-r border-b border-gray-700`}
            />
          ))}
        </div>
      ))}
      <div className="absolute z-10 w-full h-full left-0 top-0">{children}</div>
    </div>
  );
};

const createList = (): number[] => {
  let result: number[] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(i);
  }
  return result;
};

Board.displayName = "Board";

export default Board;
