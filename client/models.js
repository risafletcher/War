export class Player {
    constructor(name) {
        this.name = name;
        this.deck = [];
    }

    addCardToDeck(card) {
        this.deck.push(card);
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

    deal(player) {
        player.addCardToDeck(this.deck.pop());
    }
}