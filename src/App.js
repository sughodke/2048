import './App.css'
import { useEffect, useCallback, useState } from 'react'
import { initBoard, moveBoard } from './helper'

function directionFromKey(key) {
  switch(key) {
    case 'j':
    case 'ArrowDown':
      return 'down'

    case 'k':
    case 'ArrowUp':
      return 'up'

    case 'h':
    case 'ArrowLeft':
      return 'left'

    case 'l':
    case 'ArrowRight':
      return 'right'

    default:
      console.log(`Ignoring ${key} since it is not a valid input`)
  }
}

function App() {
  const [gameState, setGameState] = useState(initBoard())

  const handleKeyDown = useCallback((evt) => {
    const { key } = evt
    const direction = directionFromKey(key)

    const newBoard = moveBoard(direction, gameState)
    setGameState(newBoard)

    // TODO isGameOver
  }, [gameState, setGameState])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="App" onKeyPress={alert}>
      <header className="App-header">
        2048
        <button onClick={() => setGameState(initBoard())}>Reset</button>
      </header>
      <table className="App-board"><tbody>{
        gameState.map((row, rowIdx) => <tr key={rowIdx}>{
          row.map((cell, cellIdx) => <td key={cellIdx}>{cell !== 0 && cell}</td>)
        }</tr>)
      }</tbody></table>
    </div>
  );
}

export default App;
