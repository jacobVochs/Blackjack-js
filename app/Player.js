import { Hand } from "./Hand.js";

export class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.points_bet_two = 0;
        this.hand = new Hand();
    }

    calculatePoints() {
        this.points = this.hand.getStrength(this.hand.cards);
        return this.points;
    }

    calculateSplitPoints() {
        this.points = this.hand.getStrength(this.hand.bet_one_cards);
        this.points_bet_two = this.hand.getStrength(this.hand.bet_two_cards);
        return [this.points, this.points_bet_two];
    }

}