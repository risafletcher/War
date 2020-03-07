import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Player } from '../models';
import { setPlayers } from '../actions';

const Home = () => {
    const dispatch = useDispatch();
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');

    const startGame = (e) => {
        e.preventDefault();
        const player1 = new Player(player1Name);
        const player2 = new Player(player2Name);
        dispatch(setPlayers(player1, player2));
    };

    return (
        <>
            <h1>Create Players</h1>
            <section>
                <form onSubmit={startGame}>
                    <div>
                        <label htmlFor="player1name">Player 1 Name:</label>
                        <input
                            type="text"
                            name="player1name"
                            onChange={({ target }) => setPlayer1Name(target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="player1name">Player 1 Name:</label>
                        <input
                            type="text"
                            name="player1name"
                            onChange={({ target }) => setPlayer2Name(target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </>
    )
};

export default Home;