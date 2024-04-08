import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";

function App() {
  // conditions for winning the game
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Filled with nulls to present an empty board
  const [board, setBoard] = useState(Array(9).fill(null));
  // Current player is x and it's true because X goes first
  const [xPlaying, setXPlaying] = useState(true);
  // Scores of both players initially are 0
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  // handling click on the cell board
  const handleBoxClick = (boxIdx) => {
    // updated board after clicking a box
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value
      }
    });

    const winner = checkWinner(updatedBoard);

    // If there is any winner on the board then update score accordingly
    if (winner) {
      // If O won then increment oScore by 1 otherwise increment xScore by 1
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }

    }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  };

  // Check for winner in each row/column/diagonal
  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [a, b, c] = WIN_CONDITIONS[i];

      // Return true all elements of all win condition have non-null value and they are same
      if (board[a]  && board[a] === board[b] && board[a] === board[c]) {
        setGameOver(true);
        return board[a];
      }
    }
  };

  //resetBoard function to reset game when a player win or draw
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
