export class Table {
    constructor(dealersCards, playersCards, bet_one, bet_two) {
        this.dealersCards = dealersCards;
        this.playersCards = playersCards;
        this.bet_one;
        this.bet_two;
    }

    setSplitSpace() {
        const bet_one_space = document.createElement('div');
        const bet_two_space = document.createElement('div');
        const separator = document.createElement('div');
        this.playersCards.appendChild(bet_one_space);
        this.playersCards.appendChild(separator);
        this.playersCards.appendChild(bet_two_space);
        bet_one_space.setAttribute('id', 'bet1');
        bet_two_space.setAttribute('id', 'bet2');
        separator.setAttribute('id', 'sep');

        this.bet_one = bet_one_space;
        this.bet_two = bet_two_space;
    }

    removeSplitSpace() {
        document.getElementById('bet1').remove();
        document.getElementById('bet2').remove();
        document.getElementById('sep').remove();
    }

    betOneShowCards(card) {
        this.bet_one.appendChild(card.render());
    }

    betTwoShowCards(card) {
        this.bet_two.appendChild(card.render());
    }

    showPlayersCard(card) {
        this.playersCards.appendChild(card.render());
    }

    showDealersCard(card) {
        this.dealersCards.appendChild(card.render());
    }

    removeCards() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => card.remove());
    }
}