export class Bank {
    constructor() {
        this.playerMoney = 0;
        this.playerBet = 0;
        this.playerBet_two = 0;
        this.insurance = 0;
    }

    setPlayerMoney(value) {
        this.playerMoney = value;
        if (value <= 0) {
            this.playerMoney = 0;
        }
        return parseInt(this.playerMoney).toFixed(2);
    };

    setPlayerBet(value) {
        this.playerBet = value;
        return this.playerBet;

    }

    subPlayerFunds() {
        this.playerMoney -= this.playerBet;

        if (this.playerMoney <= 0) {
            return this.playerMoney = 0.00;
        }
        if (this.playerMoney <= 1) {
            return parseInt(this.playerMoney).toFixed(2);
        }
        return this.playerMoney;
    };

    addPlayerFunds() {
        this.playerMoney += this.playerBet;

        if (this.playerMoney <= 0) {
            return this.playerMoney = 0.00;
        }
        if (this.playerMoney <= 1) {
            return parseInt(this.playerMoney).toFixed(2);
        }
        return this.playerMoney;
    };

    clearInsuranceVal() {
        this.insurance = 0;
        return this.insurance;
    }

    calculateInsurance() {
        this.clearInsuranceVal();
        this.insurance += (this.playerBet / 2);
        console.log("1", this.insurance, this.playerMoney);
        this.playerMoney -= this.insurance;
        console.log("2", this.insurance, this.playerMoney);
    }

    addInsurance() {
        this.playerMoney += this.insurance * 2;
        return parseInt(this.playerMoney).toFixed(2);
    }


    doubleDown() {
        this.subPlayerFunds();
        this.playerBet *= 2;
        return parseInt(this.playerBet).toFixed(2);
    }

    split() {
        this.subPlayerFunds();
        this.playerBet_two += this.playerBet;
    }

    clearBet() {
        this.playerBet = 0;
        return this.playerBet;
    }

    addWin(val) {
        this.playerMoney += val;
        return parseInt(this.playerMoney).toFixed(2);
    }
}