"use client";

import { useState } from "react";

import { ModeToggle } from "@/components/ModeToggle";
import Node from "@/components/Node";

function indexMaker(x: number, y: number) {
  return x * 9 + y;
}

export default function Home() {
  const [board, setBoard] = useState(Array(81).fill(null));
  const [isBlacksTurn, setIsBlacksTurn] = useState(true);

  const handleClick = (x: number, y: number) => {
    const newBoard = board.map((node, index) => {
      if (index === indexMaker(x, y)) {
        return isBlacksTurn ? "black" : "white";
      }
      return node;
    });

    setIsBlacksTurn(!isBlacksTurn);
    setBoard(newBoard);
  };

  const nodeArray = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      nodeArray.push(
        <Node
          key={`${i}-${j}`}
          onClick={() => {
            handleClick(i, j);
          }}
          state={board[indexMaker(i, j)]}
        />,
      );
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-9 grid-rows-9">{nodeArray}</div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <ModeToggle />
      </footer>
    </div>
  );
}
