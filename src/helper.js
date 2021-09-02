function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function placeRandomPiece(board) {
  const size = board.length
  const [x, y, i] = [getRandomInt(size), getRandomInt(size), getRandomInt(2)]

  // go again if cell is occupied
  if (board[x][y] !== 0)
    placeRandomPiece(board)

  board[x][y] = [2, 4][i]
}

export function stub($stub) {
  // eslint-disable-next-line no-func-assign
  placeRandomPiece = $stub;
}

export function initBoard(size = 4, randomPieces = 2) {
  const board = [...Array(size)].map(x=>Array(size).fill(0))

  for (let i = 0; i < 2; i++)
    placeRandomPiece(board)

  return board
}

export function moveBoard(direction, gameState) {
  const size = gameState.length
  const newBoard = gameState.map(row => row.map(x => parseInt(x, 10)))

  let [xOffset, yOffset] = [0, 0]

  switch (direction) {
    case 'up':
      xOffset = -1
      break
    case 'left':
      yOffset = -1
      break
    case 'down':
      xOffset = 1
      break
    case 'right':
      yOffset = 1
      break
    default:
      return gameState
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const srcValue = newBoard[x][y]
      if (srcValue === 0) continue

      newBoard[x][y] = 0

      let [destX, destY] = [x, y]
      let destValue
      try {
        do {
          destX += xOffset
          destY += yOffset
          destValue = newBoard[destX][destY]
        } while (destValue === 0)

        if (destValue === srcValue) {
          newBoard[destX][destY] = srcValue << 1
        } else {
          // oops went too far
          throw new Error('go back one')
        }
      } catch (e) {
        // got to the end of the board
        newBoard[destX-xOffset][destY-yOffset] = srcValue
      }
    }
  }

  placeRandomPiece(newBoard)

  return newBoard
}

