export const TURNS = {X: "❌", O: "⚪"} //turnos (enum)

//lógica a usar para detectar el ganador, existen otras
export const WINNER_COMBOS = [
    [0, 1, 2], //horizontal
    [3, 4, 5], //horizontal
    [6, 7, 8], //horizontal
    [0, 3, 6], //vertical
    [1, 4, 7], //vertical
    [6, 7, 8], //vertical
    [0, 4, 8], //horizontal
    [2, 4, 6] //horizontal
]