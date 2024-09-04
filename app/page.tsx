"use client";

import Square from "./components/Square";
import { useState } from "react";

function TickTacToe() {
  const [player, setPlayer] = useState(1);
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));

  const [player1score, setPlayer1score] = useState(0);
  const [player2score, setPlayer2score] = useState(0);

  const onClick = (id: number) => {
    if (calcWinner(board) || board[id]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[id] = player === 1 ? "1" : "2";
    setBoard(newBoard);
    setPlayer(player === 1 ? 2 : 1);
  };

  const renderSquare = (id: number) => {
    return <Square value={board[id]} key={id} onClick={() => onClick(id)} />;
  };

  const winner = calcWinner(board);

  const updateScore = () => {
    if (calcWinner(board) === "1") {
      setPlayer1score(player1score + 1);
    } else if (calcWinner(board) === "2") {
      setPlayer2score(player2score + 1);
    }
  };

  const restart = () => {
    updateScore();
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="h-screen w-screen bg-beige-1 flex flex-col p-20">
       {/* Turn */}
      <h1 className="text-center p-10 text-5xl font-bold">
        {winner ? `Player ${winner} wins!` : `Player ${player} turn`}
      </h1>
      <div className="container mx-auto prose flex gap-5">
        {/*Main content */}
        <div className="flex-1 flex flex-col gap-5 ">
          {/* Board */}
          <div className="grid grid-cols-3 gap-8 rounded-lg bg-beige-2 p-8 m-auto ">
            {[...Array(9)].map((n, id) => renderSquare(id))}
          </div>
        </div>

        {/* Legend */}
        <div className="w-auto flex flex-col">
          <div className="flex gap-4">
            <div className="w-[60px] h-[60px] border-[16px] rounded-full border-purple-5" />
            <p>Player 1 ({player1score} wins)</p>
          </div>
          <div className="flex gap-4">
            <div className="w-[60px] h-[60px] border-[16px] border-green-3" />
            <p>Player 2 ({player2score} wins)</p>
          </div>
          <div className="flex gap-4">
            <div className="w-[60px] h-[60px] rounded-lg bg-beige-3" />
            <p>Unclaimed</p>
          </div>
          <button className="bg-green-3 p-3 rounded w-30 m-auto" onClick={restart}>
            {winner ? "Play again!" : "Restart game"}
          </button>
        </div>
      </div>
     
    </div>
  );
}

const calcWinner = (board: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default TickTacToe;
