import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { Apple, Board, Snake } from "./components";
import { DIRECTIONS } from "./constants";
import { useGameStore } from "./store/game.store";

const App: FC = () => {
  const initGame = useGameStore((state) => state.initGame);
  const moveSnake = useGameStore((state) => state.moveSnake);
  const setDirection = useGameStore((state) => state.setDirection);
  const checkIfEat = useGameStore((state) => state.checkIfEat);
  const setStatus = useGameStore((state) => state.setStatus);

  const { status } = useGameStore(
    (state) => ({
      status: state.status,
    }),
    shallow
  );

  useEffect(() => {
    initGame();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const callback = () => {
      moveSnake();
      checkIfEat();
    };
    if (!status) return;
    const interval = setInterval(callback, 90);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!status) setStatus(true);
    switch (event.key) {
      case "ArrowLeft":
        setDirection(DIRECTIONS.LEFT);
        break;
      case "ArrowRight":
        setDirection(DIRECTIONS.RIGHT);
        break;
      case "ArrowDown":
        setDirection(DIRECTIONS.DOWN);
        break;
      case "ArrowUp":
        setDirection(DIRECTIONS.UP);
        break;
    }
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <Board>
        <Snake />
        <Apple />
      </Board>
    </div>
  );
};

App.displayName = "Snake App";

export default App;
