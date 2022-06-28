import { FC } from "react";
import { useGameStore } from "../../store/game.store";

const Details: FC = () => {
  const score = useGameStore((state) => state.score);
  return (
    <div className="py-4">
      <div className="text-white font-mono text-sm uppercase">
        score<span className="text-yellow-500 ml-2">{score}</span>
      </div>
    </div>
  );
};

Details.displayName = "Details";

export default Details;
