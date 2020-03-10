export const getRankName = (rank) => {
	const royals = { '10': 'Jack', '11': 'Queen', '12': 'King' };
	if (rank > 9 && rank < 13) {
		return royals[rank];
	} else if (rank === 0) {
		return 'Ace';
	}
	return rank + 1;
};

export const getSuitName = (suit) => {
	const suits = ['hearts', 'clubs', 'diamonds', 'spades'];
	return suits[suit];
};
