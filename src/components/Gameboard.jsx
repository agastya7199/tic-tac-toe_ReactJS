export default function Gameboard({ onBoxClick, board }) {
    /* const [gameBoard, setGameBoard] = useState(initialGameboard);

    function handleBoxClick(rowIndex, colIndex) {
        setGameBoard((currentGameBoard) => {
            const updatedGameBoard = [...currentGameBoard];
            if (updatedGameBoard[rowIndex][colIndex] === null) {
                updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            }
            return updatedGameBoard;
        });
        onBoxClick();
    } */

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => {
                                return (
                                    <li key={colIndex}>
                                        <button
                                            onClick={() => onBoxClick(rowIndex, colIndex)}
                                            disabled={playerSymbol !== null}
                                        >
                                            {playerSymbol}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}
