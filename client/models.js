export class Player {
    constructor(name) {
        this.name = name;
        this.deck = [];
        this.downStack = [];
    }

    addCardToDeck(card) {
        this.deck.push(card);
    }

    playCard() {
        return this.deck.pop();
    }

    addCardsToDownStack(cards) {
        this.downStack = [...this.downStack, ...cards];
    }
}

export class WarCardPair {
    constructor(activeCard, downCard) {
        this.activeCard = activeCard;
        this.downCard = downCard;
    }
}

export class Card {
	constructor(rank, suit) {
		this.suit = suit;
		this.rank = rank;
	}
}

export class Deck {
    constructor({ numberOfSuits, numberOfRanks }) {
        this.numberOfSuits = numberOfSuits;
        this.numberOfRanks = numberOfRanks;
        this.deck = [];
    }

    get length() {  // writing deck.deck.length can be confusing
        return this.deck.length;
    }

    create() {
        for (let rank = 0; rank < this.numberOfRanks; rank++) {
            for (let suit = 0; suit < this.numberOfSuits; suit++) {
                this.deck.push(new Card(rank, suit));
            }
        }
    }

    shuffle() {
        // Fiscer-Yates Shuffle: https://bost.ocks.org/mike/shuffle/
        let currentIndex = this.deck.length;
        while (currentIndex !== 0) {
            // pick a random card
            const randomIndex = Math.floor(Math.random() * currentIndex);
            // shift the current index down
            currentIndex--;
            // swap the cards
            const temp = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temp;
        }
    }

    dealCard() {
        return this.deck.pop();
    }

    makeEven() {
        if (this.deck.length % 2 !== 0) {
            this.deck.pop();
        }
    }
}