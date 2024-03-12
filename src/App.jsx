import React, { useEffect, useState } from "react";
import './App.css'

const TURNS = {X: "x", O: "o"} //turnos (enum)

//componente "cuadrado"
const Square = ({children, isSelected, updateBoard, index}) => {
  const className = 'square'.concat(isSelected ? ' is-selected' : ' ')
  const handleClick = () => {
    updateBoard(index);
  }
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

const WinnerModal = ({winner, resetGame}) => {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : "Ganó"

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}


//lógica para detectar el ganador, existen otras
const WINNER_COMBOS = [
  [0, 1, 2], //horizontal
  [3, 4, 5], //horizontal
  [6, 7, 8], //horizontal
  [0, 3, 6], //vertical
  [1, 4, 7], //vertical
  [6, 7, 8], //vertical
  [0, 4, 8], //horizontal
  [2, 4, 6] //horizontal
]

function App() {
  const [turn, setTurn] = useState(TURNS.X) //estado de los turnos

  const [board, setBoard] = useState(Array(9).fill(null)) //estado del tablero
  const updateBoard = (index) => { //esta función se llama en cada click que se hace al tablero, le paso como parámetro la posición del cuadrado en la que se hizo click
    //actualizar el tablero
    if(board[index] || winner) return console.log("ya hay ganador no actualizo nada (updateBoard())") //si la posición tiene algo, no hago nada

    console.log("Actualizo, aún no hay ganador (updateBoard())")

    const newBoard = [...board] //hago una copia del bord, LOS ESTADOS SON INMUTABLES
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard) //en cada actualización de la board, nos fijamos si hay un ganador
    if(newWinner) { //si encontramos un ganador, es decir, la función no retorno null
      setWinner(newWinner) //El cambio de estado es ASINCRONO, el código de debajo no tiene por que saber que el estado cambió
      console.log(winner) //esta parte del código todavía "no sabe" el nuevo valor que se seteo una línea atrás
    }
  }

  const [winner, setWinner] = useState(null) //estado del ganador
  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) { //por caba combo posible vemos si hay un ganador
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]      
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  }

  //reseteo el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)
    console.log("ejecute resetGame()")
  }

  return ( //esto es todo lo que recibe la clase que va a usar este componente
    <main className='board'>
      <h1>Ta Te Ti</h1>
      <section className="game"> {
        board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square> //en updateBoard estamos pasando como parámetro la función, no estamos ejecutando la función
          ) 
        })
      }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App