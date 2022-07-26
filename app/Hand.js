export class Hand {

    constructor() {
        this.cards = [];
        this.bet_one_cards = [];
        this.bet_two_cards = [];
    }

    addCard(hand, card) {
        hand.push(card);
    }


    // addCard(card) {
    //     this.cards.push(card);
    // }


    splitCards(card, index) {
        this.cards.splice(index, 0, card);
    }

    setSplitHands() {
        this.bet_one_cards = this.cards.slice(0, 2);
        this.bet_two_cards = this.cards.slice(2, 4);
    }

    countCardsByWeight(weight) {
        return this.cards.filter(card => card.weight == weight).length;
    }

    getStrength(hand) {

        if (this.countCardsByWeight('A') == 2 && hand.length == 2) {
            return 21;
        }

        const cards = hand.map(card => {
            if (['K', 'Q', 'J'].includes(card.weight)) {
                return 10;
            }

            if (hand.length == 2 && card.weight == 'A') {
                return 11;
            }

            if (hand.length > 2 && card.weight == 'A') {
                return 1;
            }

            if (hand.length == 0) {
                return 0;
            }

            return parseInt(card.weight);
        });

        if (hand.length) {
            return cards.reduce(function (sum, weight) {
                return parseInt(sum) + parseInt(weight);
            })
        } else {
            return 0;
        }
    }

    // ? original below
    // getStrength() {
    //     if (this.countCardsByWeight('A') == 2 && this.cards.length == 2) {
    //         return 21;
    //     }

    //     const cards = this.cards.map(card => {
    //         if (['K', 'Q', 'J'].includes(card.weight)) {
    //             return 10;
    //         }

    //         if (this.cards.length == 2 && card.weight == 'A') {
    //             return 11;
    //         }

    //         if (this.cards.length > 2 && card.weight == 'A') {
    //             return 1;
    //         }

    //         if (this.cards.length == 0) {
    //             return 0;
    //         }

    //         return parseInt(card.weight);
    //     });

    //     if (this.cards.length) {
    //         return cards.reduce(function (sum, weight) {
    //             return parseInt(sum) + parseInt(weight);
    //         })
    //     } else {
    //         return 0;
    //     }
    // }

    clearHand() {
        this.cards.length = 0;
        this.bet_one_cards.length = 0;
        this.bet_two_cards.length = 0;
    }

}