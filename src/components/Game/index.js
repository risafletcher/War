import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Deck, Player } from '../../models';
import War from './War';
import Card from './Card';
import { INACTIVE, ACTIVE, SETTLE, REQUEST, HOME } from '../../consts';

// center play area
const CardArea = ({ player1Card, player2Card, winner }) => (
    <div className="card-area">
        <Card suit={player1Card.suit} rank={player1Card.rank}/>
        <div>
            {winner ? <>Winner: <strong>{winner}</strong></> : 'War!'}
        </div>
        <Card suit={player2Card.suit} rank={player2Card.rank}/>
    </div>
);

CardArea.propTypes = {
	player1Card: PropTypes.shape({
		suit: PropTypes.number,
		rank: PropTypes.number
	}),
	player2Card: PropTypes.shape({
		suit: PropTypes.number,
		rank: PropTypes.number
    }),
    winner: PropTypes.string,
};

const dealCards = (player1, player2, deck) => {
    const deckSize = deck.length;
    for (let i = 0; i < deckSize; i++) {
        const card = deck.dealCard();
        if (i % 2 === 0) {
            player1.addCardToDeck(card);
        } else {
            player2.addCardToDeck(card);
        }
    }
};

// player sidebars
const PlayerArea = ({ player }) => (
    <div>
        <h3>{player.name}</h3>
        <div>
            Down stack size: {player.downStack.length}
        </div>
    </div>
);

PlayerArea.propTypes = {
    player: PropTypes.instanceOf(Player),
}

const Game = ({
    setView,
    player1,
    player2,
}) => {
    const [ player1Card, setPlayer1Card ] = useState(null);
    const [ player2Card, setPlayer2Card ] = useState(null);
    const [ cardsRemaining, setCardsRemaining ] = useState(0);
    const [ warStatus, setWarStatus ] = useState(INACTIVE);
    const [ winner, setWinner ] = useState('');
    const gameStarted = player1Card && player2Card;
    
    useEffect(() => {
        const deck = new Deck({ numberOfSuits: 4, numberOfRanks: 13 });
        deck.create();
        deck.shuffle();
        deck.makeEven();
        dealCards(player1, player2, deck);
        setCardsRemaining(player1.deck.length);
    }, []);

    useEffect(() => {
        if (gameStarted) {
            if (player1Card.rank === player2Card.rank) {
                setWinner('');
                setWarStatus(REQUEST);  // user consent before war begins
            } else if (player1Card.rank > player2Card.rank) {
                player1.addCardsToDownStack([player1Card, player2Card]);
                setWinner(player1.name);
            } else {
                player2.addCardsToDownStack([player2Card, player1Card]);
                setWinner(player2.name);
            }
            setCardsRemaining(player1.deck.length);
        }
    }, [player1Card, player2Card]);

    const playTurn = () => {
        setPlayer1Card(player1.playCard());
        setPlayer2Card(player2.playCard());
    };

    if (!cardsRemaining || warStatus === SETTLE) {
        return (
            <div className="game-over">
                <h4>{winner} wins!</h4>
                Game over. Play again?
                <div>
                    <button onClick={() => setView(HOME)}>Ok</button>
                </div>
            </div>
        )
    }

    const renderCardArea = () => {
        if (warStatus === ACTIVE) {
            return (
               <War
                    player1={player1}
                    player2={player2}
                    setWinner={setWinner}
                    setWarStatus={setWarStatus}/> 
            );
        }
        return (
            <CardArea
                player1Card={player1Card}
                player2Card={player2Card}
                winner={winner}/>
        );
    };

    const renderButton = () => {
        if (warStatus === REQUEST) {
            return (
                <button type='submit' onClick={() => setWarStatus(ACTIVE)}>
                    Start War
                </button>
            );
        }
        if (warStatus === INACTIVE) {
            return (
                <button type='submit' onClick={playTurn}>
                    Play Turn
                </button>
            )
        }
    }

    return (
			<div className='game'>
				<div className='title'>
					<h2>Game</h2>
				</div>
				<PlayerArea player={player1} />
				<div className='game__active-area'>
					<div>
						<strong>Cards remaining in deck: {cardsRemaining}</strong>
					</div>
					<div>{gameStarted && renderCardArea()}</div>
				</div>
				<PlayerArea player={player2} />
				<div className='active-button'>
					{renderButton()}
				</div>
			</div>
		);
};

Game.propTypes = {
    setView: PropTypes.func,
    player1: PropTypes.instanceOf(Player),
    player2: PropTypes.instanceOf(Player),
}

export default Game;