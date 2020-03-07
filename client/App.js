import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './Nav';
import Home from './Home';
import Game from './Game';
import { HOME, GAME } from './actions';

const viewSelector = (state = {}) => state.view;

const getViewComponent = (view) => {
    switch (view) {
        case HOME:
            return <Home/>
        case GAME:
            return <Game/>
        default:
            return <Home/>;
    }
};

const App = () => {
    const view = useSelector(viewSelector);
    return (
        <>
            <header>
                <Nav/>
            </header>
            <main>
                {getViewComponent(view)}
            </main>
        </>
    )
};

export default App;