import { WINNER_COMBOS } from "../constants";

//estos métodos no usan React, como son solamenta JavaScript tradicional podemos reutilizarlos en otros proyectos sin importar que biblioteca estemos usando
export const checkWinner = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null) //si no hay espacios en el array nulos
}