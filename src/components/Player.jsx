import { useState } from 'react';

export default function Player({ name, symbol, isActive, onNameChange }) {
    const [player, setPlayer] = useState(name);
    const [editMode, setEditMode] = useState(false);

    function inputChangeHandler(event) {
        setPlayer(event.target.value);
    }
    function handleClick() {
        setEditMode((editMode) => !editMode);
        if (editMode) {
            onNameChange(symbol, player);
        }
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editMode ? (
                    <input type="text" required value={player} onChange={inputChangeHandler} />
                ) : (
                    <span className="player-name">{player}</span>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{editMode ? 'Save' : 'Edit'}</button>
        </li>
    );
}
