export default function Winner({ winnerName, onRematch }) {
    return (
        <>
            <div id="game-over">
                <h2>Game Over!</h2>
                {winnerName ? (
                    <p>{`${winnerName.toUpperCase()} is the winner`}</p>
                ) : (
                    <p>It's is a draw</p>
                )}
                <button onClick={onRematch}>Rematch</button>
            </div>
        </>
    );
}
