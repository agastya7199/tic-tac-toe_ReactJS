import { useState } from 'react';
import Player from './components/Player.jsx';
import Gameboard from './components/Gameboard.jsx';
import Log from './components/Log.jsx';
import Gameover from './components/Gameover.jsx';
import { WINNING_COMBINATIONS } from './WinningCombinations.js';

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
};

function getActiveSymbol(turns) {
    let activeSymbol = 'X';
    if (turns.length && turns[0].playerSymbol === 'X') {
        activeSymbol = 'O';
    }
    return activeSymbol;
}

function getGameBoard(playerTurns) {
    const gameBoard = [...INITIAL_GAME_BOARD.map((item) => [...item])];
    for (const turn of playerTurns) {
        const { square, playerSymbol } = turn;
        const { row, col } = square;
        gameBoard[row][col] = playerSymbol;
    }
    return gameBoard;
}

function getWinner(gameBoard) {
    let winner;
    WINNING_COMBINATIONS.forEach((combination) => {
        const firstSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
        if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
            winner = firstSymbol;
        }
    });
    return winner;
}

function App() {
    const [playerTurns, setPlayerTurns] = useState([]);
    const [playerNames, setPlayerNames] = useState(PLAYERS);
    const activeSymbol = getActiveSymbol(playerTurns);
    let hasDraw = false;

    const gameBoard = getGameBoard(playerTurns);
    const winner = getWinner(gameBoard);

    if (playerTurns.length === 9 && !winner) {
        hasDraw = true;
    }

    function handleSymbolChange(rowIndex, colIndex) {
        setPlayerTurns((prevTurns) => {
            const currentPlayerSymbol = getActiveSymbol(prevTurns);
            const updatedTurns = [
                { square: { row: rowIndex, col: colIndex }, playerSymbol: currentPlayerSymbol },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    }

    function handleRematch() {
        setPlayerTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayerNames((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        isActive={activeSymbol === 'X'}
                        name={playerNames['X']}
                        symbol="X"
                        onNameChange={handlePlayerNameChange}
                    />
                    <Player
                        isActive={activeSymbol === 'O'}
                        name={playerNames['O']}
                        symbol="O"
                        onNameChange={handlePlayerNameChange}
                    />
                </ol>
                {winner || hasDraw ? (
                    <Gameover winnerName={playerNames[winner]} onRematch={handleRematch} />
                ) : null}
                <Gameboard onBoxClick={handleSymbolChange} board={gameBoard} />
            </div>
            <Log turns={playerTurns} />
        </main>
    );
}

export default App;
