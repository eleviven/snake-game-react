import { CSSProperties, FC } from "react";
import { PIXEL_SIZE } from "../../constants";
import { useGameStore } from "../../store/game.store";
import { numWithPx } from "../../utils";

const Snake: FC = () => {
  const snakeTails = useGameStore((state) => state.snakeTails);

  return (
    <div className="relative">
      {snakeTails.map((item, index) => {
        const styles: CSSProperties = {
          left: numWithPx(item.x),
          top: numWithPx(item.y),
        };
        return (
          <div
            key={index}
            className={`absolute z-10 bg-red-500 w-[${numWithPx(
              PIXEL_SIZE
            )}] h-[${numWithPx(PIXEL_SIZE)}]`}
            style={styles}
          />
        );
      })}
    </div>
  );
};

Snake.displayName = "Snake";

export default Snake;
