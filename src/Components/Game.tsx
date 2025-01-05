import { useState } from "react";

import Confetti from "react-confetti";
import useAudio from "../hooks/useAudio";

const Game = () => {
  const { audioRef: hoverSound, play: playHoverSound } = useAudio(
    "src/assets/hover.mp3"
  );
  const { audioRef: clickSound, play: playClickSound } = useAudio(
    "src/assets/click.mp3"
  );
  const { audioRef: winnerSound, play: playWinnerSound } = useAudio(
    "src/assets/winner.mp3"
  );
  const { audioRef: drawSound, play: playDrawSound } = useAudio(
    "src/assets/draw.mp3"
  );
  const [winner, setWinner] = useState<string>("");
  const [showConfetti, setshowConfetti] = useState(false);
  const [hover, setHover] = useState<{
    row: number | null;
    col: number | null;
  }>({
    row: null,
    col: null,
  });
  const playerX = "X";
  const playerO = "O";
  const [player, setPlayer] = useState(playerX);
  const togglePlayer = () =>
    setPlayer((prev) => (prev === "X" ? playerO : playerX));
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const checkWinner = (board: String[][], currentPlayer: string) => {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === currentPlayer &&
        board[i][1] === currentPlayer &&
        board[i][2] === currentPlayer
      )
        return true; // Row win
      if (
        board[0][i] === currentPlayer &&
        board[1][i] === currentPlayer &&
        board[2][i] === currentPlayer
      )
        return true; // Column win
    }
    if (
      board[0][0] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][2] === currentPlayer
    )
      return true; // Main diagonal win
    if (
      board[0][2] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][0] === currentPlayer
    )
      return true; // Anti-diagonal win

    return false; // No win
  };
  const isBoardFull = (board: string[][]) => {
    return board.every((row) => row.every((cell) => cell !== ""));
  };

  const handleClick = (row: number, col: number) => {
    if (board[row][col] !== "") return;
    playClickSound();
    const newBoard = [...board];
    newBoard[row][col] = player;
    setBoard(newBoard);
    // Check for a winner or draw
    if (checkWinner(newBoard, player)) {
      playWinnerSound();
      setWinner(player);
      setshowConfetti(true);
    } else if (isBoardFull(newBoard)) {
      playDrawSound();
      setWinner("Draw");
    } else {
      // Toggle the player if no winner yet
      togglePlayer();
    }
  };
  const handleMouseEnter = (row: number, col: number) => {
    playHoverSound();
    if (board[row][col] === "") {
      setHover({ row, col });
    }
  };
  const handleMouseLeave = () => {
    setHover({ row: null, col: null });
  };
  const renderMarkerValue = (row: number, col: number, marker: string) => {
    if (marker !== "") return marker;
    else if (hover.row === row && hover.col === col) return player;
    else return "";
  };
  const resetGame = () => {
    playClickSound();
    setWinner("");
    setPlayer(playerX);
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setshowConfetti(false);
  };
  return (
    <>
      <div className=" grid grid-cols-3 bg-white">
        {showConfetti && (
          <Confetti
            className="border border-solid border-red-500 absolute left-0 w-screen h-screen"
            recycle={false}
            numberOfPieces={2000}
          />
        )}
        <audio ref={hoverSound} src="src/assets/hover.mp3" preload="auto" />
        <audio ref={clickSound} src="src/assets/click.mp3" preload="auto" />
        <audio ref={winnerSound} src="src/assets/winner.mp3" preload="auto" />
        <audio ref={drawSound} src="src/assets/draw.mp3" preload="auto" />
        {board.map((row, i) =>
          row.map((marker, j) => (
            <button
              disabled={winner !== ""}
              onMouseEnter={() => handleMouseEnter(i, j)}
              onMouseLeave={handleMouseLeave}
              key={`${i}${j}`}
              onClick={() => handleClick(i, j)}
              className={`relative min-h-24 border-solid hover:scale-105 rounded-lg flex justify-center items-center border hover:bg-pink-600/80 duration-100 transform ease-in hover:cursor-pointer 
                ${(i + j) % 2 === 0 ? "bg-green-200" : "bg-green-500"}
                ${hover?.row === i && hover?.col === j ? "z-10" : "z-0"}`}
            >
              {renderMarkerValue(i, j, marker)}
            </button>
          ))
        )}
        {winner !== "" && (
          <div className="p-2 absolute top-0 right-0 h-full bg-black/50 rounded-lg shadow-xl w-full text-white text-4xl font-bold flex flex-col pt-[15rem] items-center">
            {winner !== "Draw" && <p>Player {winner} wins!</p>}
            {winner === "Draw" && <p>It's a draw...</p>}
            <button
              onClick={resetGame}
              onMouseEnter={() => playHoverSound()}
              className="px-2 py-2 text-base border rounded-lg ring mt-2 bg-green-600 hover:bg-pink-600/80 hover:scale-105 duration-300 "
            >
              Play again?
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
