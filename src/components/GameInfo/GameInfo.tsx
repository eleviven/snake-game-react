import { FC } from "react";
import shallow from "zustand/shallow";
import { useGameStore } from "../../store/game.store";

const GameInfo: FC = () => {
  const { appleCords, snakeTails } = useGameStore(
    (state) => ({
      appleCords: state.appleCoords,
      snakeTails: state.snakeTails,
    }),
    shallow
  );
  return (
    <div className="py-4 px-4 sm:px-0">
      <div className="text-gray-500 font-mono text-[8px] flex flex-col gap-2">
        <div>Apple: {JSON.stringify(appleCords)}</div>
        <div>
          Snake Head: {JSON.stringify(snakeTails[snakeTails.length - 1])}
        </div>
      </div>
    </div>
  );
};

GameInfo.displayName = "Game Info";

export default GameInfo;
