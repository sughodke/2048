function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function initBoard(size = 4, randomPieces = 2) {
  const board = [...Array(size)].map(x=>Array(size).fill(0))
  function setPieceRandomly() {
    const [x, y, i] = [getRandomInt(size), getRandomInt(size), getRandomInt(2)]
    board[x][y] = [2, 4][i]
  }

  for (let i = 0; i < 2; i++)
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
    default:
      return gameState
  }

  let x, y

  /* Assume we are moving downwards (v),
   *  here are the 3 cases we care about.
   *
   *  A        |
   *  0 B   E  v
   *  0 0   F
   *  0 C D 0
   *
   */
  function* generateNextHit({x, y, xOffset, yOffset}) {
    let [destX, destY] = [x, y]
    do {
      destX += xOffset
      destY += yOffset
      let destValue = newBoard[destX][destY]

      yield { destX, destY, destValue}
    } while (destX >= 0 && destX < size && destY >= 0 && destY < size)
  }

  for (x = 0; x < size; x += step) {
    for (y = 0; y < size; y += step) {
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

  return newBoard
}

