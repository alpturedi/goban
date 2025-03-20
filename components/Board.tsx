"use client";
import { Fragment, useState } from "react";

import Node from "@/components/Node";
import { Button } from "@/components/ui/button";

function canBreathe(board: Array<null | "b" | "w">[], x: number, y: number, path: { x: number; y: number }[], color: "b" | "w"): boolean {
  //Out of the board
  if (x < 0 || x >= 9 || y < 0 || y >= 9) {
    return false;
  }

  //If I cheked before
  if (path.findIndex((item) => item.x === x && item.y === y) !== -1) {
    return false;
  }

  //Can breathe through the empty space
  if (board[x][y] === null) {
    return true;
  }

  //Enemy stone
  if (board[x][y] !== color) {
    return false;
  }

  path.push({ x, y });

  //Next
  return canBreathe(board, x - 1, y, path, color) || canBreathe(board, x + 1, y, path, color) || canBreathe(board, x, y - 1, path, color) || canBreathe(board, x, y + 1, path, color);
}

function checkCapture(board: Array<null | "b" | "w">[]) {
  const checked = Array(9)
    .fill(false)
    .map(() => Array(9).fill(false));

  for (let i = 0; i < 9; i++) {
    for (let j = -0; j < 9; j++) {
      const color = board[i][j];
      if (color !== null) {
        const path = [] as { x: number; y: number }[];
        if (canBreathe(board, i, j, path, color) === false) {
          path.forEach((item) => {
            board[item.x][item.y] = null;
          });
        }
        path.forEach((item) => {
          checked[item.x][item.y] = true;
        });
      } else {
        checked[i][j] = true;
      }
    }
  }
}

function getLetterForIndex(index: number) {
  return String.fromCharCode(97 + index);
}

function getIndexFromIndex(index: number) {
  return 9 - index;
}

export default function Board() {
  const [board, setBoard] = useState<Array<null | "b" | "w">[]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
  );
  const [isBlacksTurn, setIsBlacksTurn] = useState(true);
  const [moveHistory, setMoveHistory] = useState<Array<{ x: number | "p"; y: number }>>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleClick = (x: number, y: number) => {
    const newBoard = board.map((item) => [...item]);
    newBoard[x][y] = isBlacksTurn ? "b" : "w";
    if (!canBreathe(newBoard, x, y, [], isBlacksTurn ? "b" : "w")) {
      return;
    }
    checkCapture(newBoard);
    setMoveHistory([...moveHistory, { x, y }]);
    setIsBlacksTurn(!isBlacksTurn);
    setBoard(newBoard);
  };

  const handlePass = () => {
    if (moveHistory[moveHistory.length - 1]?.x === "p" && moveHistory[moveHistory.length - 2]?.x === "p") {
      setIsGameOver(true);
    }
    setMoveHistory([...moveHistory, { x: "p", y: 0 }]);
    setIsBlacksTurn(!isBlacksTurn);
  };

  const nodeArray = [];
  for (let i = 0; i < 10; i++) {
    for (let j = -1; j < 9; j++) {
      nodeArray.push(
        i === 9 || j === -1 ? (
          <div key={`${i}-${j}`} className="hidden lg:grid w-20 h-20 pl-8 pt-8">
            <span>{i === 9 ? (j === -1 ? "" : getLetterForIndex(j)) : getIndexFromIndex(i)}</span>
          </div>
        ) : (
          <Node
            key={`${i}-${j}`}
            title={`${i}-${j}`}
            onClick={() => {
              if (!isGameOver && board[i][j] === null) {
                handleClick(i, j);
              }
            }}
            state={board[i][j]}
            turn={isGameOver ? "end" : isBlacksTurn ? "b" : "w"}
          />
        ),
      );
    }
  }
  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-9 grid-rows-9 lg:grid-rows-10 lg:grid-cols-10 w-dvw h-dvw lg:w-[unset] lg:h-[unset] aspect-square">{nodeArray}</div>
        <Button onClick={handlePass}>{isGameOver ? "Play Again" : "Pass"}</Button>
      </div>
      <div className="hidden lg:block p-4 font-mono whitespace-pre-wrap min-w-48">
        {moveHistory.map((item, index) => {
          const order = 1 + Math.floor(index / 2);
          const maxLength = (moveHistory.length + 1).toString().length;
          let formattedString = "";
          for (let i = 0; i < maxLength - order.toString().length; i++) {
            formattedString += " ";
          }
          formattedString += order.toString();
          return (
            <Fragment key={index}>
              {index % 2 === 0 ? <span>{formattedString + " - "}</span> : <span>{" - "}</span>}
              <span key={index}>{item?.x !== "p" ? `(${getLetterForIndex(item.x)}${getIndexFromIndex(item.y)})` : "Pass"}</span>
              {index % 2 === 1 && <br />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
