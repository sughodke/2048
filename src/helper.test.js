import { render, screen } from '@testing-library/react';
import { moveBoard, stub } from './helper';

function toGameBoard(board) {
  return [...board.matchAll(/[0-9]{4}/g)]
    .map(row => row[0].split('')
      .map(x => parseInt(x, 10)))
}

function toStringBoard(gameBoard) {
  return gameBoard.map(row => row.join('')).join('\n')
}


beforeAll(() => {
  stub(() => {})
})

test('collapse works', () => {
  const board = toGameBoard(`
  4000
  0004
  0200
  0020
  `)

  let nextBoard
  nextBoard = moveBoard('right', board)
  expect(nextBoard).toStrictEqual(toGameBoard(`
  0004
  0004
  0002
  0002
  `))

  nextBoard = moveBoard('down', board)
  expect(nextBoard).toStrictEqual(toGameBoard(`
  0000
  0000
  0000
  4224
  `))

  nextBoard = moveBoard('up', board)
  expect(nextBoard).toStrictEqual(toGameBoard(`
  4224
  0000
  0000
  0000
  `))

  nextBoard = moveBoard('left', board)
  expect(nextBoard).toStrictEqual(toGameBoard(`
  4000
  4000
  2000
  2000
  `))
})

test('additive works', () => {
  const board = toGameBoard(`
  4040
  4002
  0220
  0022
  `)

  let nextBoard
  nextBoard = moveBoard('right', board)
  expect(nextBoard).toStrictEqual(toGameBoard(`
  0008
  0042
  0004
  0004
  `))

  nextBoard = moveBoard('left', board)
  expect(nextBoard).toStrictEqual(toGameBoard(`
  8000
  4200
  4000
  4000
  `))

  nextBoard = moveBoard('up', board)
  expect(nextBoard).toStrictEqual(toGameBoard(`
  8244
  0040
  0000
  0000
  `))

  nextBoard = moveBoard('down', board)
  console.log(toStringBoard(nextBoard))
  /*
   * Defect is here
   *
   *  0000
   *  0040 **
   *  0000
   *  8244
   *
   */
  expect(nextBoard).toStrictEqual(toGameBoard(`
  0000
  0000
  0040
  8244
  `))
})

describe('yoda', () => {
  beforeEach((t) => { t.apple = 1})

  test('apple', () => {
    expect(this.apple).toStrictEqual(1)
  })
})
