import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { WarCardPair, Player } from '../../models';
import { INACTIVE, SETTLE } from '../../consts';
import { Card, DownCard } from './Card';

const War = ({ player1, player2, setWinner, setWarStatus }) => {
	const [player1Cards, setPlayer1Cards] = useState([]);
	const [player2Cards, setPlayer2Cards] = useState([]);
	const [winnersName, setWinnersName] = useState();

	const playWar = () => {
		const player1DownCard = player1.playCard();
		const player1Card = player1.playCard();
		const player2DownCard = player2.playCard();
		const player2Card = player2.playCard();

		// if there aren't enough cards left to battle
		if (!player1Card || !player1DownCard) {
			return setWarStatus(SETTLE);
		}

		setPlayer1Cards([
			...player1Cards,
			new WarCardPair(player1Card, player1DownCard)
		]);
		setPlayer2Cards([
			...player2Cards,
			new WarCardPair(player2Card, player2DownCard)
		]);
		if (player1Card.rank === player2Card.rank) {
			setWinnersName();
		} else {
			const allPlayer1Cards = player1Cards.flatMap(
				({ activeCard, downCard }) => [activeCard, downCard]
			);
			const allPlayer2Cards = player2Cards.flatMap(
				({ activeCard, downCard }) => [activeCard, downCard]
			);
			if (player1Card.rank > player2Card.rank) {
				player1.addCardsToDownStack([...allPlayer1Cards, ...allPlayer2Cards]);
				setWinnersName(player1.name);
			} else {
				player2.addCardsToDownStack([...allPlayer1Cards, ...allPlayer2Cards]);
				setWinnersName(player2.name);
            }
		}
	};

	useEffect(() => playWar(), []);

	const returnToGame = () => {
		setWinner(winnersName);
		setWarStatus(INACTIVE);
	}

	if (player1Cards.length === 0 || player2Cards.length === 0) {
		return (
			<div className='war__action-button'>
				<button onClick={playWar}>Start War</button>
			</div>
		);
	}

	return (
		<div className='war'>
			<div className='war__player1Cards'>
				{player1Cards.map(({ activeCard }, index) => (
					<div key={`p1_${index}`}>
						<Card suit={activeCard.suit} rank={activeCard.rank}/>
						<DownCard/>
					</div>
				))}
			</div>
			<div className='war__player2Cards'>
				{player2Cards.map(({ activeCard }, index) => (
					<div key={`p2_${index}`}>
						<Card suit={activeCard.suit} rank={activeCard.rank}/>
						<DownCard/>
					</div>
				))}
			</div>
			<div className="war__action-button">
				{winnersName ? (
					<>
						<div>{winnersName} has won the war.</div>
						<button onClick={returnToGame}>OK</button>
					</>
				) : <button onClick={playWar}>Continue war</button>}
			</div>
		</div>
	);
};

War.propTypes = {
    player1: PropTypes.instanceOf(Player).isRequired,
    player2: PropTypes.instanceOf(Player).isRequired,
    setWarStatus: PropTypes.func.isRequired,
};

export default War;
