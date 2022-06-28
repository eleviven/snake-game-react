import { CSSProperties, FC } from "react";
import { PIXEL_SIZE } from "../../constants";
import { useGameStore } from "../../store/game.store";
import { numWithPx } from "../../utils";

const Apple: FC = () => {
  const appleCoords = useGameStore((state) => state.appleCoords);

  if (!appleCoords) {
    return null;
  }

  const styles: CSSProperties = {
    left: numWithPx(appleCoords.x),
    top: numWithPx(appleCoords.y),
    width: numWithPx(PIXEL_SIZE),
    height: numWithPx(PIXEL_SIZE),
  };

  return <div className={`absolute z-[1] bg-green-500`} style={styles} />;
};

Apple.displayName = "Apple";

export default Apple;
