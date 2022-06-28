import { FC } from "react";
import { useGameStore } from "../../store/game.store";

const Details: FC = () => {
  const score = useGameStore((state) => state.score);
  return (
    <div className="flex items-center justify-between py-4 font-mono select-none">
      <div className="text-gray-400 text-sm uppercase">
        score<span className="text-yellow-500 ml-2">{score}</span>
      </div>
      <div className="text-gray-500 text-xs">
        use <span className="text-gray-400">w,a,s,d</span> or{" "}
        <span className="text-gray-400">arrows</span> to move
      </div>
    </div>
  );
};

Details.displayName = "Details";

export default Details;
