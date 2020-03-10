import React from 'react';
import PropTypes from 'prop-types';
import { getSuitName, getRankName } from './utils';

export const Card = ({ suit, rank, ...props }) => (
	<div className="card">
		<div>Suit: {getSuitName(suit)}</div>
		<div>Rank: {getRankName(rank)}</div>
	</div>
);

Card.propTypes = {
	suit: PropTypes.number,
	rank: PropTypes.number,
};

export const DownCard = () => <div className="card"></div>;

export default Card;