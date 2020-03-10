import React, { useState } from 'react';
import { Player } from '../../models';
import { GAME } from '../../consts';

const Home = ({
    setView,
    setPlayer1,
    setPlayer2,
}) => {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');

    const startGame = (e) => {
        e.preventDefault();
        setPlayer1(new Player(player1Name));
        setPlayer2(new Player(player2Name));
        setView(GAME);
    };

    return (
        <div className="home">
            <h2>Create Players</h2>
            <form onSubmit={startGame} className="create-players-form">
                <div>
                    <label htmlFor="player1name">Player 1 Name:</label>
                    <input
                        type="text"
                        name="player1name"
                        id="player1name"
                        onChange={({ target }) => setPlayer1Name(target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="player2name">Player 2 Name:</label>
                    <input
                        type="text"
                        name="player2name"
                        id="player2name"
                        onChange={({ target }) => setPlayer2Name(target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Home;