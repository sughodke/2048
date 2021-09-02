function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default class GameBoard {
  constructor(size = 4, board) {
    if (board) {
      this.board = board
      this.size = board.length
      return this
    }

    this.board = [...Array(size)]
      .map(x=>Array(size).fill(0))
    this.size = size
  }
 // [...board].map(x => [...x])

  static fromBoard(board) {
    return new GameBoard(-1, board)
  }

  static init(randomPieces = 2) {
    const ret = new GameBoard()

    for (let i = 0; i < randomPieces; i++)
      ret.placeRandomPiece()

    return ret
  }

  static fromString(board) {
    board = [...board.matchAll(/[0-9]{4}/g)]
        .map(row => row[0].split('')
          .map(x => parseInt(x, 10)))
    return GameBoard.fromBoard(board)
  }

  toString() {
    return this.board.map(row => row.join('')).join('\n')
  }

  valueOf() {
    return this.toString()
  }

  placeRandomPiece() {
    const size = this.size
    const [x, y, i] = [getRandomInt(size), getRandomInt(size), getRandomInt(2)]

    // go again if cell is occupied
    if (this.board[x][y] !== 0)
      placeRandomPiece(board)

    this.board[x][y] = [2, 4][i]
  }

  move(direction) {
    const size = this.size
    let transformed = this

    const xOffset = 1

    switch (direction) {
      case 'left':
        transformed = transformed.flipBoard('horizontal')
      case 'right':
        transformed = transformed.transposeBoard()
      case 'up':
        transformed = transformed.flipBoard('vertical')
      case 'down':
        break
      default:
        return this
    }

    const newBoard = transformed.board

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
            destY += 0
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
          newBoard[destX-xOffset][destY] = srcValue
        }
      }
    }

    transformed.placeRandomPiece()

    switch (direction) {
      case 'down':
        break
      case 'up':
        transformed = transformed.flipBoard('vertical')
      case 'right':
        transformed = transformed.flipBoard('vertical')
        transformed = transformed.transposeBoard()
      case 'left':
        transformed = transformed.flipBoard('vertical')
        transformed = transformed.transposeBoard()
        transformed = transformed.flipBoard('horizontal')
      default:
        return this
    }

    return transformed
  }

  flipBoard(direction = 'horizontal') {
    const { board } = this;
    const newBoard = direction === 'horizontal'
      ? board.map(row => [...row].reverse())
      : [...board].reverse()

    return GameBoard.fromBoard(newBoard)
  }

  transposeBoard() {
    const { board } = this;
    const newBoard = board[0].map(
      (x,i) => board.map(x => x[i]))

    return GameBoard.fromBoard(newBoard)
  }
}

export function stub($stub) {
  GameBoard.prototype.placeRandomPiece = $stub
}
