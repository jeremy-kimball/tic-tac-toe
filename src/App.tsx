import './App.css'
import { useState } from 'react';

function Square({value, onSquareClick} : {value: number, onSquareClick:any}){
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
    );
}

export default function Board() {
  const[squares, setSquares] = useState(Array(9).fill(null));
  const[turn, setTurn] = useState<number>(0);
  const[player, setPlayer] = useState<string>("0");
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (player);
  }

  function handleClick(i: number){
    //copy array
    const nextSquares = squares.slice();
    //is desired space empty??
    if(nextSquares[i] !== null || calculateWinner(squares))
      {
        return;
      }
    //determine turn
    if(turn%2)
      {
        //update square value & player display value
        nextSquares[i] = "X";
        setPlayer("0");
      }
      else{
        nextSquares[i] = "0";
        setPlayer("X");
      }
    //update grid & whose turn it is
    setTurn(turn + 1);
    setSquares(nextSquares);
  }

  return (
  <>
    <h1>{status}</h1>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    <button onClick={() => (window.location.reload())}>New Game</button>
  </>
  );

  //copy pasted winner calculation
  function calculateWinner(squares: React.ReactElement[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}
