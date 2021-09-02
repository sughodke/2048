import GameBoard, { stub } from './GameBoard';

beforeAll(() => {
  stub(() => {})
})

test('collapse works', () => {
  const board = GameBoard.fromString(`
  4000
  0004
  0200
  0020
  `)

  let nextBoard
  nextBoard = board.move('right')

  console.log(nextBoard.toString())
  /*
  expect(nextBoard.toString()).toStrictEqual(GameBoard.fromString(`
  0004
  0004
  0002
  0002
  `).toString())
  */
})
