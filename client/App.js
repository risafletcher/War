import React, { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import { HOME, GAME } from './consts';
import './styles.css';

const App = () => {
    const [ view, setView ] = useState(HOME);
    const [ player1, setPlayer1 ] = useState('');
    const [ player2, setPlayer2 ] = useState('');

    const getViewComponent = (view) => {
        switch (view) {
            case HOME:
                return <Home
                        setView={setView}
                        setPlayer1={setPlayer1}
                        setPlayer2={setPlayer2}/>
            case GAME:
                return <Game
                        setView={setView}
                        player1={player1}
                        player2={player2}/>
            default:
                return <Home
                        setView={setView}
                        setPlayer1={setPlayer1}
                        setPlayer2={setPlayer2}/>
        }
    };
    return (
            <div className="app">
                {getViewComponent(view)}
            </div>
    )
};

export default App;