import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti"
import './App.css'
import {Square} from "./components/Square.jsx"
import {WinnerModal} from "./components/WinnerModal.jsx"
import {checkWinner, checkEndGame} from "./logic/board.js";
import {TURNS, WINNER_COMBOS} from "./constants.js"

function App() {
  const [turn, setTurn] = useState(TURNS.X) //estado de los turnos
  const [winner, setWinner] = useState(null) //estado del ganador

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
      confetti();
    } else if (checkEndGame(newBoard)) {
        setWinner(false)
    }
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