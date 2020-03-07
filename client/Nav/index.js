import React from 'react';
import { useDispatch } from 'react-redux';
import { setView, HOME, GAME } from '../actions';

const Nav = () => {
    const dispatch = useDispatch();
    const changeView = (view) => dispatch(setView(view));
    return (
        <nav>
            <button onClick={() => changeView(HOME)}>{HOME}</button>
            <button onClick={() => changeView(GAME)}>{GAME}</button>
        </nav>
    )
}

export default Nav;