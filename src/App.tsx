import { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { Apple, Board, Details, GameInfo, Snake } from "./components";
import { DIRECTIONS } from "./constants";
import { useGameStore } from "./store/game.store";
import { GAME_STATUSES } from "./types";

const App: FC = () => {
  const initGame = useGameStore((state) => state.initGame);
  const moveSnake = useGameStore((state) => state.moveSnake);
  const setDirection = useGameStore((state) => state.setDirection);
  const setStatus = useGameStore((state) => state.setStatus);
  const checkIfEat = useGameStore((state) => state.checkIfEat);
  const checkIfCross = useGameStore((state) => state.checkIfCross);
  const checkIfBorder = useGameStore((state) => state.checkIfBorder);

  const { status, score } = useGameStore(
    (state) => ({
      status: state.status,
      score: state.score,
    }),
    shallow
  );

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === GAME_STATUSES.END) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const callback = () => {
      moveSnake();
      checkIfEat();
      checkIfCross();
      checkIfBorder();
    };
    if ([GAME_STATUSES.END, GAME_STATUSES.STOP].includes(status)) {
      return;
    }
    const interval = setInterval(callback, 90);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (status === GAME_STATUSES.STOP) setStatus(GAME_STATUSES.START);
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        setDirection(DIRECTIONS.LEFT);
        break;
      case "ArrowRight":
      case "d":
        setDirection(DIRECTIONS.RIGHT);
        break;
      case "ArrowDown":
      case "s":
        setDirection(DIRECTIONS.DOWN);
        break;
      case "ArrowUp":
      case "w":
        setDirection(DIRECTIONS.UP);
        break;
    }
  };

  return (
    <div className="grid place-items-center min-h-screen py-6">
      <div>
        <Details />
        <Board>
          <Snake />
          <Apple />
          {status === GAME_STATUSES.END && (
            <div className="absolute z-20 w-full h-full flex items-center justify-center bg-red-500 bg-opacity-40">
              <div className="bg-red-500 text-white w-8/12 rounded-xl p-6 flex flex-col items-center">
                <div className="text-xs">Game Over</div>
                <div className="font-bold">Your Score</div>
                <div className="font-bold text-3xl my-3">{score}</div>
                <button
                  onClick={initGame}
                  className="bg-white text-red-800 border border-red-800 font-semibold px-3 py-2 rounded-md"
                >
                  Restart
                </button>
              </div>
            </div>
          )}
        </Board>
        <GameInfo />
      </div>
    </div>
  );
};

App.displayName = "Snake App";

export default App;
