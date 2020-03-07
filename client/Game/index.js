import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Deck, Player } from '../models';

const DownStack = ({ count }) => {
    return (
        <div>Cards in down stack: {count}</div>
    )
};

DownStack.propTypes = {
    count: PropTypes.number,
};

const dealCards = ({ player1, player2, deck }) => {
    if (deck.length % 2 !== 0) {
        deck.deck.pop();
    }
    for (let i = 0; i < deck.length; i++) {
        if (i % 2 === 0) {
            deck.deal(player1);
        } else {
            deck.deal(player2);
        }
    }
}

const getPlayersSelector = (state = {}) => state.players;

const Game = () => {
    const { player1, player2 } = useSelector(getPlayersSelector);
    useEffect(() => {
        // deck values index origin at 0 in order to remain agnostic
        const deck = new Deck({ numberOfSuits: 4, numberOfRanks: 13 });
        deck.create();
        deck.shuffle();
        dealCards({ player1, player2, deck });
    }, [player1, player2]);

    return (
        <div>
            <div>{player1.name}</div>
            <div>{player2.name}</div>
        </div>
    );
};

export default Game;