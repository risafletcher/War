import { combineReducers } from 'redux';
import {
    HOME,
    GAME,
    SET_VIEW,
    SET_PLAYERS
} from './actions';

const initialPlayerState = {
    player1: {},
    player2: {},
};

function players(state = initialPlayerState, action) {
    switch (action.type) {
        case SET_PLAYERS:
            return {
                ...state,
                player1: action.player1,
                player2: action.player2
            };
        default:
            return state;
    }
}

function view(state = null, action) {
    switch (action.type) {
        case SET_VIEW:
            return action.view;
        default:
            return state;
    }
}

export default combineReducers({
    players,
    view
});