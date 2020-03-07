export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_VIEW = 'SET_VIEW';
export const HOME = 'HOME';
export const GAME = 'GAME';

export const setView = (view) => ({
    type: SET_VIEW,
    view
});

export const setPlayers = (player1, player2) => ({
    type: SET_PLAYERS,
    player1,
    player2
});
