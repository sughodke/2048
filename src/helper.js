export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function initBoard(size = 4) {
  const board = [...Array(size)].map(x=>Array(size).fill(0))
  function setPieceRandomly() {
    const [x, y, i] = [getRandomInt(size), getRandomInt(size), getRandomInt(2)]
    board[x][y] = [2, 4][i]
  }

  setPieceRandomly()
  setPieceRandomly()
  return board
}

export function moveBoard(direction, gameState) {
  const size = gameState.length
  const newBoard = gameState.map(row => row.map(x => parseInt(x, 10)))

  let [xOffset, yOffset] = [0, 0]
  let [start, end, step] = [0, size, 1]

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
  }

  let x, y

  /* Assume we are moving downwards (v),
   *  here are the 3 cases we care about.
   *
   *  A
   *  v B
   *  v v
   *  X C D
   *
   */
  for (x = 0; x < size; x += step) {
    for (y = 0; y < size; y += step) {
      const srcValue = newBoard[x][y]

      let [destX, destY] = [x, y]
      let destValue
      try {
        do {
          destX += xOffset
          destY += yOffset
          destValue = newBoard[destX][destY]
        } while (destValue !== 0)
      } catch (e) {
        // oops went too far, go back one
        newBoard[destX-xOffset][destY-yOffset] = srcValue

        // got to the end of the board, move to the next column
        continue
      }

      newBoard[x][y] = 0
      // if (srcValue === 0) {
        // do nothing
      // } else if (destValue === 0) {
      // } else
      if (destValue === srcValue) {
        newBoard[destX][destY] = srcValue << 1
      } else {
        newBoard[x][y] = srcValue
      }
    }
  }

  return newBoard
}

