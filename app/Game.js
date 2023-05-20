import { Bank } from './Bank.js';
import { Card } from './Card.js';
import { Deck } from './Deck.js';
import { Message } from './Message.js';
import { Player } from './Player.js';
import { Table } from './Table.js';

class Game {
	constructor({
		player,
		playerPoints,
		playerPoints_two,
		playerPoints_two_wrap,
		dealerPoints,
		table,
		hitButton,
		hit_bet_one,
		hit_bet_two,
		standButton,
		messageBox,
		playAgainButton,
		fundsButton,
		fundsAgainButton,
		insurance,
		bankMessage,
		vol,
		bet,
		bet_two,
		bet_two_wrap,
		funds,
		betAsk,
		passBet,
		betDisplay,
		betSet,
		insuranceBox,
		insFund,
		insCancel,
		insuranceWrap,
		insuranceAmo,
		isInsuranceSet,
		double,
		split,
		is_split_set,
		bet_two_result,
		info,
		insurance_info,
		split_info,
		isInsuranceAvailable,
		is_split_available,
		is_bet_two_won,
		bet_two_win_val,
		result_info,
	}) {
		this.hitButton = hitButton;
		this.hit_bet_one = hit_bet_one;
		this.hit_bet_two = hit_bet_two;
		this.standButton = standButton;
		this.playAgainButton = playAgainButton;
		this.fundsButton = fundsButton;
		this.fundsAgainButton = fundsAgainButton;
		this.insurance = insurance;
		this.playerPoints = playerPoints;
		this.playerPoints_two = playerPoints_two;
		this.playerPoints_two_wrap = playerPoints_two_wrap;
		this.dealerPoints = dealerPoints;
		this.messageBox = messageBox;
		this.bankMessage = bankMessage;
		this.player = player;
		this.dealer = new Player('Krupier');
		this.table = table;
		this.deck = new Deck();
		this.deck.shuffle();
		this.vol = vol;
		this.amount = amount;
		this.bet = bet;
		this.bet_two = bet_two;
		this.bet_two_wrap = bet_two_wrap;
		this.funds = funds;
		this.betAsk = betAsk;
		this.passBet = passBet;
		this.betDisplay = betDisplay;
		this.betSet = betSet;
		this.insuranceBox = insuranceBox;
		this.insFund = insFund;
		this.insCancel = insCancel;
		this.insuranceWrap = insuranceWrap;
		this.insuranceAmo = insuranceAmo;
		this.isInsuranceSet = isInsuranceSet;
		this.isInsuranceAvailable = isInsuranceAvailable;
		this.double = double;
		this.split = split;
		this.is_split_set = is_split_set;
		this.is_split_available = is_split_available;
		this.bet_two_result = '';
		this.info = info;
		this.insurance_info = insurance_info;
		this.split_info = split_info;
		this.is_bet_two_won = is_bet_two_won;
		this.bet_two_win_val = bet_two_win_val;
		this.result_info = '';
	}

	run() {
		this.isInsuranceSet = false;
		this.isInsuranceAvailable = false;
		this.is_split_set = false;
		this.is_split_available = false;
		this.is_bet_two_won = false;

		this.hitButton.addEventListener('click', event => {
			this.hitCard();
		});

		this.hit_bet_one.addEventListener('click', event => {
			this.hitCardBetOne();
		});

		this.hit_bet_two.addEventListener('click', event => {
			this.hitCardBetTwo();
		});

		this.standButton.addEventListener('click', event => {
			this.revealDealerSecCard();
			this.dealerPoints.innerHTML = this.dealer.calculatePoints();
			this.dealerPlays();
			this.hitButton.setAttribute('disabled', '');
			this.standButton.setAttribute('disabled', '');
			this.double.setAttribute('disabled', '');
			// setTimeout(() => { this.dealerPlays() }, 2000);

			// console.log(this.player.points)
			// console.log(this.dealer.points)
		});

		this.insurance.addEventListener('click', event => {
			this.setInsurance();
		});

		this.insCancel.addEventListener('click', () => {
			this.insuranceBox.hide();
			this.insuranceWrap.classList.toggle('hidden');
		});

		this.insFund.addEventListener('click', () => {
			bank.clearInsuranceVal();
			bank.calculateInsurance();
			this.insuranceAmo.textContent = `${bank.insurance.toFixed(2)}$`;
			this.funds.textContent = `${bank.playerMoney.toFixed(2)}$`;
			this.insuranceBox.hide();
			this.insurance.setAttribute('disabled', '');
			this.split.setAttribute('disabled', '');
			this.double.setAttribute('disabled', '');
		});

		this.double.addEventListener('click', () => {
			this.setDouble();
		});

		this.split.addEventListener('click', () => {
			this.setSplit();
		});

		this.playAgainButton.addEventListener('click', event => this.playAgain());

		this.vol.addEventListener(
			'input',
			event => (this.amount.textContent = `${this.vol.value}$`)
		);

		this.fundsButton.addEventListener('click', event => {
			this.messageBox.hide();
			this.setAmountOfMoney();
			this.playAgain();
		});

		this.fundsAgainButton.addEventListener('click', event => {
			this.messageBox.hide();
			this.bankMessage.show();
		});

		this.passBet.addEventListener('click', event => {
			this.betAsk.hide();
			// bank.subPlayerFunds();
			// this.bet.textContent = `${bank.setPlayerBet(parseInt(bank.playerBet).toFixed(2))}$`;
			this.bet.textContent = `${bank.playerBet}$`;
			this.funds.textContent = `${bank.subPlayerFunds()}$`;
			this.playerPoints.classList.remove('hidden');
			this.dealerPoints.classList.remove('hidden');
		});

		// game prep functions

		// Nowy przebieg:
		// 1.poproś o fundusze
		// 2.poproś o zakład
		// 3.pokaż 1 kartę
		// 4.decyzja gracza
		// 5.pokaż 2 kartę
		// 6.rozstrzygnięcie
		this.bankMessage.show();
		// this.dealCards();
	}

	setInfo() {
		this.info.classList.toggle('hidden');
		if (this.isInsuranceAvailable == true) {
			this.insurance_info.classList.toggle('hidden');
		} else if (this.is_split_available == true) {
			this.split_info.classList.toggle('hidden');
		}
	}

	setSplit() {
		this.is_split_set = true;

		for (let i = 1; i <= 3; i += 2) {
			let split_card = this.deck.pickOne();
			this.player.hand.splitCards(split_card, i);
		}

		this.player.hand.setSplitHands();

		// console.log(this.player.hand.bet_one_cards, this.player.hand.bet_two_cards);

		const player_bet_one = this.player.hand.bet_one_cards;
		const player_bet_two = this.player.hand.bet_two_cards;
		const dealer_cards_recovery = this.dealer.hand.cards;

		this.table.removeCards();
		this.table.setSplitSpace();

		for (let i = 0; i < player_bet_one.length; i++) {
			this.table.betOneShowCards(player_bet_one[i]);
		}

		for (let j = 0; j < player_bet_two.length; j++) {
			this.table.betTwoShowCards(player_bet_two[j]);
		}

		for (let k = 0; k < dealer_cards_recovery.length; k++) {
			this.table.showDealersCard(dealer_cards_recovery[k]);
		}

		bank.split();
		this.bet_two.innerHTML = `${parseInt(bank.playerBet_two).toFixed(2)}$`;
		this.funds.innerHTML = `${parseInt(bank.playerMoney).toFixed(2)}$`;

		const cardInDom = document.querySelectorAll('div.card');
		cardInDom[5].classList.add('cardHidden');
		this.split.classList.add('hidden');

		this.dealer.calculatePoints();

		this.playerPoints_two_wrap.classList.remove('hidden');
		this.playerPoints.innerHTML = this.player.calculateSplitPoints()[0];
		this.playerPoints_two.innerHTML = this.player.calculateSplitPoints()[1];

		this.double.classList.add('hidden');

		this.bet_two_wrap.classList.remove('hidden');

		this.hitButton.classList.add('hidden');
		this.hit_bet_one.classList.remove('hidden');
		this.hit_bet_two.classList.remove('hidden');
	}

	setDouble() {
		let card1 = this.deck.pickOne();
		this.player.hand.addCard(this.player.hand.cards, card1);
		this.table.showPlayersCard(card1);
		// bank.doubleDown();
		this.playerPoints.innerHTML = this.player.calculatePoints();
		this.bet.textContent = `${bank.doubleDown()}$`;
		this.funds.textContent = `${bank.playerMoney}$`;
		this.revealDealerSecCard();
		this.dealerPlays();
	}

	setInsurance() {
		this.isInsuranceSet = true;
		this.insuranceBox.show();
		this.insuranceWrap.classList.toggle('hidden');
	}

	removeInsurance() {
		this.insuranceAmo.textContent = `0$`;
		bank.clearInsuranceVal();
		this.insuranceWrap.classList.toggle('hidden');
		this.isInsuranceSet = false;
		this.isInsuranceAvailable = false;
		this.setInfo();
	}

	setAmountOfBet() {
		this.betAsk.show();

		// bank.setPlayerBet(bank.playerMoney / 2)
		this.betDisplay.textContent = `${bank.setPlayerBet(bank.playerMoney)}$`;
		this.betSet.setAttribute('value', bank.playerMoney.toString());
		this.betSet.setAttribute('max', bank.playerMoney.toString());

		if (Number.isInteger(bank.playerMoney) === false) {
			this.betSet.setAttribute('step', '0.01');
		}

		this.betSet.addEventListener('input', event => {
			this.betDisplay.textContent = `${this.betSet.value}$`;
			bank.setPlayerBet(this.betSet.value);
		});
	}

	setAmountOfMoney() {
		this.funds.textContent = `${bank.setPlayerMoney(this.vol.value)}$`;
		this.bankMessage.hide();

		if (bank.playerMoney === 1) {
			console.log(bank.playerMoney);
			bank.setPlayerBet(1);
			this.funds.textContent = `${bank.subPlayerFunds()}$`;
			this.bet.textContent = `${bank.setPlayerBet(bank.playerBet.toFixed(2))}$`;
			return;
		} else {
			this.setAmountOfBet();
		}
	}

	hitCard() {
		this.insurance.setAttribute('disabled', '');
		const card = this.deck.pickOne();
		this.player.hand.addCard(this.player.hand.cards, card);
		this.table.showPlayersCard(card);
		this.playerPoints.innerHTML = this.player.calculatePoints();
	}

	hitCardBetOne() {
		const card = this.deck.pickOne();
		this.player.hand.addCard(this.player.hand.bet_one_cards, card);
		this.table.betOneShowCards(card);
		this.playerPoints.innerHTML = this.player.calculateSplitPoints()[0];
	}

	hitCardBetTwo() {
		const card = this.deck.pickOne();
		this.player.hand.addCard(this.player.hand.bet_two_cards, card);
		this.table.betTwoShowCards(card);
		this.playerPoints_two.innerHTML = this.player.calculateSplitPoints()[1];
	}

	revealDealerSecCard() {
		const dealerSecCard = document.querySelectorAll('div.card');
		dealerSecCard[dealerSecCard.length - 1].classList.remove('cardHidden');
	}

	dealCards() {
		for (let n = 0; n < 2; n++) {
			// ! this code has to be uncommented when split sim is off
			let card1 = this.deck.pickOne();
			this.player.hand.addCard(this.player.hand.cards, card1);
			this.table.showPlayersCard(card1);
			// !

			// ! this code has to be uncommented when insurance/dealer<21 sim is off
			let card2 = this.deck.pickOne();
			this.dealer.hand.addCard(this.dealer.hand.cards, card2);
			this.table.showDealersCard(card2);
			// !

			// tu wykrycie że idzie 2 karta

			if (n == 0) {
				//! split sim
				// let card1 = new Card();
				// card1.weight = "8";
				// card1.type = "&spades;";
				// this.player.hand.addCard(this.player.hand.cards, card1);
				// this.table.showPlayersCard(card1);
				//! upper code to be commented after split ready
				//! insurance sim
				// let card2 = new Card();
				// card2.weight = "A";
				// card2.type = "&spades;";
				// this.dealer.hand.addCard(this.dealer.hand.cards, card2);
				// this.table.showDealersCard(card2);
				//! upper code to be commented after insurance ready
				//! dealer<21
				// let card2 = new Card();
				// card2.weight = "2";
				// card2.type = "&spades;";
				// this.dealer.hand.addCard(this.dealer.hand.cards, card2);
				// this.table.showDealersCard(card2);
				//! upper code to be commented after dealer<21 ready

				this.dealerPoints.innerHTML = card2.weight;
				// this.table.showDealersCard(card2);

				if (card2.weight == 'A') {
					this.isInsuranceAvailable = true;
					console.log(this.isInsuranceAvailable);
					this.setInfo();
					this.insurance.removeAttribute('disabled');
				}
			}

			if (n == 1) {
				//! split sim
				// let card1 = new Card();
				// card1.weight = "8";
				// card1.type = "&spades;";
				// this.player.hand.addCard(this.player.hand.cards, card1);
				// this.table.showPlayersCard(card1);
				//! upper code to be commented after split ready
				// ! insurance sim
				// let card2 = new Card();
				// card2.weight = "K";
				// card2.type = "&spades;";
				// this.dealer.hand.addCard(this.dealer.hand.cards, card2);
				// this.table.showDealersCard(card2);
				// !

				//!
				// let card2 = this.deck.pickOne();
				// this.dealer.hand.addCard(this.dealer.hand.cards, card2);
				// this.table.showDealersCard(card2);

				//! upper code to be commented after insurance ready

				//! dealer<21
				// let card2 = new Card();
				// card2.weight = "2";
				// card2.type = "&spades;";
				// this.dealer.hand.addCard(this.dealer.hand.cards, card2);
				// this.table.showDealersCard(card2);
				//! upper code to be commented after dealer<21 ready

				const cardInDom = document.querySelectorAll('div.card');
				// cardInDom[3].classList.remove(`${card2.type}`);
				cardInDom[3].classList.add('cardHidden');
			}
		}

		if (player.hand.cards[0].weight == player.hand.cards[1].weight) {
			this.is_split_available = true;
			this.setInfo();
			this.split.removeAttribute('disabled');
		}

		this.playerPoints.classList.add('hidden');
		this.dealerPoints.classList.add('hidden');

		if (bank.playerBet === 1 && bank.playerBet_two === 0) {
			this.playerPoints.classList.remove('hidden');
			this.dealerPoints.classList.remove('hidden');
		}

		this.playerPoints.innerHTML = this.player.calculatePoints();
	}

	dealerPlays() {
		// !to be set afert dealer<21 sim is off
		// while (this.dealer.points <= this.player.points && this.dealer.points <= 16 && this.player.points <= 21)
		// while (this.dealer.points <= 8)
		// !
		while (
			this.dealer.points <= this.player.points &&
			this.dealer.points <= 16 &&
			this.player.points <= 21
		) {
			const card = this.deck.pickOne();
			this.dealer.hand.addCard(this.dealer.hand.cards, card);
			this.table.showDealersCard(card);
			this.dealerPoints.innerHTML = this.dealer.calculatePoints();
		}

		if (this.is_split_set == false) {
			this.endTheGame();
		} else {
			this.playBetTwo();
			setTimeout(() => {
				this.endTheGame();
			}, 2000);
		}
	}

	updateFunds(bet) {
		bet.textContent = `${bank.clearBet()}$`;
		bank.subPlayerFunds();
		this.funds.textContent = `${bank.playerMoney.toFixed(2)}$`;
	}

	playBetTwo() {
		if (
			this.player.points_bet_two <= 21 &&
			this.player.points_bet_two == this.dealer.points
		) {
			this.bet_two_result = 'Bet II Tie';
			bank.playerMoney += bank.playerBet_two;
			this.is_bet_two_won = false;
			this.bet_two_win_val = 0;
			return;
		}

		if (this.player.points_bet_two == 21) {
			this.bet_two_result = 'Bet II Player Wins - Blackjack!';
			bank.playerMoney += bank.playerBet_two + bank.playerBet_two * 0.5;
			this.is_bet_two_won = true;
			this.bet_two_win_val = (
				bank.playerBet_two +
				bank.playerBet_two * 0.5
			).toFixed(2);
			return;
		}

		if (this.player.points_bet_two > 21) {
			this.bet_two_result = 'Bet II Dealer Wins';
			bank.playerBet_two -= bank.playerBet_two;
			this.is_bet_two_won = false;
			this.bet_two_win_val = 0;
			return;
		}

		if (this.dealer.points > 21) {
			this.bet_two_result = 'Bet II Player Wins';
			bank.playerMoney += bank.playerBet_two + bank.playerBet_two * 0.25;
			this.is_bet_two_won = true;
			this.bet_two_win_val = (
				bank.playerBet_two +
				bank.playerBet_two * 0.25
			).toFixed(2);
			return;
		}

		if (this.player.points_bet_two < this.dealer.points) {
			this.bet_two_result = 'Bet II Dealer Wins';
			bank.playerBet_two -= bank.playerBet_two;
			this.is_bet_two_won = false;
			this.bet_two_win_val = 0;
			return;
		}

		if (this.player.points_bet_two > this.dealer.points) {
			this.bet_two_result = 'Bet II Player Wins';
			bank.playerMoney += bank.playerBet_two + bank.playerBet_two * 0.25;
			this.is_bet_two_won = true;
			this.bet_two_win_val = (
				bank.playerBet_two +
				bank.playerBet_two * 0.25
			).toFixed(2);
			return;
		}
	}

	balanceCheck() {
		this.hit_bet_one.classList.add('hidden');
		this.hit_bet_two.classList.add('hidden');
		bank.clearBet();
		if (bank.playerMoney <= 0.1) {
			this.updateFunds(bet.toFixed(2));
			bank.playerBet_two = 0;
			if (this.is_split_set == false) {
				this.updateFunds(bet_two.toFixed(2));
			}
			this.funds.textContent = '0.00$';
			this.messageBox.setText(`${this.result_info}\nBrak $$$`).show();
			this.playAgainButton.style.display = 'none';
			this.fundsAgainButton.style.display = 'inline-block';
			return;
		} else {
			// this.updateFunds(bet);
			bank.playerBet_two = 0;
			if (this.is_split_set == false) {
				this.updateFunds(bet_two.toFixed(2));
			}
			this.messageBox.setText(`${this.result_info}`).show();
			this.playAgainButton.style.display = 'inline-block';
			this.fundsAgainButton.style.display = 'none';
		}
	}

	endTheGame() {
		this.hitButton.removeEventListener('click', event => this.hitCard());
		this.standButton.removeEventListener('click', event => this.dealerPlays());

		this.hitButton.classList.add('hidden');
		this.standButton.classList.add('hidden');
		this.split.classList.add('hidden');
		this.double.classList.add('hidden');
		this.insurance.classList.add('hidden');

		if (this.player.points <= 21 && this.player.points == this.dealer.points) {
			if (this.is_split_set == false) {
				this.result_info = 'Tie';
				this.balanceCheck();
			} else {
				this.result_info = `Bet I Tie\n${this.bet_two_result}\nWin: ${
					this.is_bet_two_won ? this.bet_two_win_val : 0
				}$`;
				this.balanceCheck();
			}
			bank.playerMoney += bank.playerBet;
			bet.textContent = `${bank.clearBet()}$`;
			this.funds.textContent = `${bank.playerMoney.toFixed(2)}$`;
			if (this.isInsuranceSet == true) {
				this.removeInsurance();
			}
			return;
		}

		if (this.player.points == 21) {
			let result = parseInt(bank.playerBet) + bank.playerBet * 0.5;
			bank.addWin(result);
			console.log(bank.playerMoney, result);
			if (this.is_split_set == false) {
				this.result_info = `Player Wins - Blackjack!\nWin: ${result}$`;
				this.balanceCheck();
			} else {
				let sum = parseInt(result + this.bet_two_win_val).toFixed(2);
				this.result_info = `Bet I Player Wins - Blackjack!\n${
					this.bet_two_result
				}\nWin: ${this.is_bet_two_won ? sum : result}$`;
				this.balanceCheck();
			}
			// this.updateFunds(bet);
			bet.textContent = `${bank.clearBet()}$`;
			this.funds.textContent = `${bank.playerMoney.toFixed(2)}$`;
			if (this.isInsuranceSet == true) {
				this.removeInsurance();
			}
			return;
		}

		if (this.player.points > 21) {
			// bank.playerMoney = bank.subPlayerFunds();
			bet.textContent = `${bank.clearBet()}$`;
			if (this.is_split_set == false) {
				this.result_info = 'Dealer Wins';
				this.balanceCheck();
			} else {
				this.result_info = `Bet I Dealer Wins\n${this.bet_two_result}\nWin: ${
					this.is_bet_two_won ? this.bet_two_win_val : 0
				}$`;
				this.balanceCheck();
			}
			if (this.isInsuranceSet == true) {
				this.removeInsurance();
			}
			return;
		}

		if (this.dealer.points > 21) {
			let result = parseInt(bank.playerBet) + bank.playerBet * 0.25;
			bank.addWin(result);
			console.log(bank.playerMoney, result);
			if (this.is_split_set == false) {
				this.result_info = `Player Wins\nWin: ${result.toFixed(2)}$`;
				this.balanceCheck();
			} else {
				let sum = parseInt(result + this.bet_two_win_val).toFixed(2);
				this.result_info = `Bet I Player Wins\n${this.bet_two_result}$\nWin: ${
					this.is_bet_two_won ? sum : result
				}$`;
				this.balanceCheck();
				setTimeout(() => {
					this.balanceCheck();
				}, 3000);
			}
			// this.updateFunds(bet);
			bet.textContent = `${bank.clearBet()}$`;
			this.funds.textContent = `${bank.playerMoney.toFixed(2)}$`;
			if (this.isInsuranceSet == true) {
				this.removeInsurance();
			}
			return;
		}

		if (this.player.points < this.dealer.points) {
			// bank.playerMoney = bank.subPlayerFunds();
			bet.textContent = `${bank.clearBet()}$`;
			if (this.is_split_set == false) {
				this.result_info = 'Dealer Wins';
				this.balanceCheck();
			} else {
				this.result_info = `Bet I Dealer Wins\n${this.bet_two_result}\nWin:${
					this.is_bet_two_won ? this.bet_two_win_val : 0
				}$`;
				this.balanceCheck();
			}

			if (this.dealer.points == 21 && this.isInsuranceSet == true) {
				this.funds.textContent = `${bank.addInsurance()}$`;
				this.insuranceAmo.textContent = `${bank.clearInsuranceVal()}$`;
				this.removeInsurance();
			}
			return;
		}

		if (this.player.points > this.dealer.points) {
			let result = parseInt(bank.playerBet) + bank.playerBet * 0.25;
			bank.addWin(result);
			if (this.is_split_set == false) {
				this.result_info = `Player Wins\nWin: ${result.toFixed(2)}$`;
				this.balanceCheck();
			} else {
				let sum = parseInt(result + this.bet_two_win_val).toFixed(2);
				this.result_info = `Bet I Player Wins\n${this.bet_two_result}\nWin:${
					this.is_bet_two_won ? sum : result
				}$`;
				this.balanceCheck();
			}
			// this.updateFunds(bet);
			bet.textContent = `${bank.clearBet()}$`;
			this.funds.textContent = `${bank.playerMoney.toFixed(2)}$`;
			if (this.isInsuranceSet == true) {
				this.removeInsurance();
			}
			return;
		}
	}

	setNewDeal() {
		this.player.hand.clearHand();
		this.dealer.hand.clearHand();
		this.playerPoints.innerHTML = this.player.calculatePoints();
		this.dealerPoints.innerHTML = this.dealer.calculatePoints();
		if (bank.playerBet === 1) {
			this.double.classList.add('hidden');
			this.split.classList.add('hidden');
			this.insurance.classList.add('hidden');
			// this.setInfo();
			return;
		} else {
			this.setAmountOfBet();
		}
	}

	playAgain() {
		messageBox.hide();
		this.is_bet_two_won = false;
		this.insurance.classList.remove('hidden');
		this.split.classList.remove('hidden');
		this.double.classList.remove('hidden');
		this.double.removeAttribute('disabled', '');
		this.hitButton.classList.remove('hidden');
		this.hitButton.removeAttribute('disabled', '');
		this.hit_bet_one.classList.add('hidden');
		this.hit_bet_two.classList.add('hidden');
		this.bet_two_wrap.classList.add('hidden');
		this.playerPoints_two_wrap.classList.add('hidden');
		this.hitButton.classList.remove('hidden');
		this.standButton.classList.remove('hidden');
		this.standButton.removeAttribute('disabled', '');
		this.setNewDeal();
		this.table.removeCards();
		if (this.is_split_set == true) {
			this.table.removeSplitSpace();
			this.is_split_set = false;
			this.is_split_available = false;
			this.setInfo();
		}
		this.dealCards();
	}
}

const table = new Table(
	document.getElementById('dealersCards'),
	document.getElementById('playersCards'),
	document.getElementById('bet1'),
	document.getElementById('bet2')
);

const messageBox = new Message(document.getElementById('messageBox'));

const bankMessage = new Message(document.getElementById('bankMessage'));

const betAsk = new Message(document.getElementById('askForBet'));

const insuranceBox = new Message(document.getElementById('insuranceBox'));

const player = new Player('Kuba');

// amount display
const bet = document.getElementById('bet');
const bet_two = document.getElementById('bet_two');
const bet_two_wrap = document.getElementById('bet_two_wrap');
const funds = document.getElementById('funds');

const bank = new Bank();

//? do zrobienia

//! pamiętać o zdejmowaniu symulacji!
// ? poprawić setInfo aby przy 2 wystąpieniu insurance/splita wyświetlało odpowiedni komunikat a nie tylko puste okno
//ukrycie zawartości 2 karty dealera
// ograniczenie wyświetlania $ do 2 miejsc po ,
// sprawdzić czy toFixed działa i zmienić aktualizację danych w polach gry na to co zwracają metody Bank
// rozegranie splita przy 0$
// wyświetlenie wygranych $ w oknie
// sprawdzić wyświetlanie komunikatów przy insurance i splicie
// ustalić co się pieprzy przy wygranje dodaje liczby jak stringi
// małe kwoty, zerowanie konta
// ? ogólne testy
// dodanie splita
//symulacja 2 takich samych kart
//rozpoznanie 2 tożsamych kart if
// wyświetlenie 2 par kart
// dodanie czyszczenia obecnych kart aby po splice załadować zaktual. listę kart
// wyrysowanie podziału
// dodanie wyświetlenia nowego zakładu
// dodanie hit dla każdego zakładu z osobna
// dodanie obliczenia i wyświetlenia kwot osobnych zakładów
// gaszenie double
// ukrywanie nieużywanych przycisków
// dodanie rozegrania dla każdego zakładu z osobna
// rozegranie każdego zakładu osobno + wyświetlenie wyników cząstkowych
// na koniec rozliczenie rundy
// 2 linie w wyniku
// ? animacja kart
// ukrycie hit 1 i 2 na wynikach splita

// dodanie double - done
// this.setDouble(); i this.setSplit(); już są +nasłuch do zrobienia funkcje

// dodać funkcję blokującą poprzez attr disabled hit i stand button - in progress

// dodanie ubezpieczenia - done
//okno insurance + obliczenia - done
//obliczenia insurance zależne od wyniku - done

// obsłużenie remisu - done
// czyszczenie stołu po grze - done
// aktualizacja funduszy zależnie od wyniku (działa do dodanie ponowne pytanie o zakład i aktulizacja stanu) - done
// pytanie o dalszą grę w przypadku gdy graczowi skończą się fundusze - done

// ukrywanie kart i punktów przed ustawieniem zakładu - done
//odkrywanie karty dealera gdy gracz podejmie decyzję - done
//setinterval dla dealerPlays żeby pokazać kartę line 42 - done
// Gracz stawia zakład na specjalnym stole używając żetonów. Następnie gracz i krupier dostają po dwie karty. Obydwie karty gracza są odkryte, natomiast tylko jedna karta krupiera jest pokazana graczowi. Gracz teraz może podjąć decyzje o swoim następnym ruchu. (hit/stand/double/split/insurance)

// Zadania obiektu Bank

// pobieranie portfela - done
// pobieranie zakładów - done
// aktualizacja stanu konta - done
// uruchamianie okien z powiadomieniami (daj$,kwota zakładu, nie masz$ co dalej?) - done

// Zadania obiektu Game

//! wyświetlanie/aktualizacja - rzeczy z listy niżej
// pozostałe środki - done
// kwota zakładu - done
// przebieg gry na zadeklarowanej stawce - done

const game = new Game({
	hitButton: document.getElementById('hit'),
	hit_bet_one: document.getElementById('hit_bet_one'),
	hit_bet_two: document.getElementById('hit_bet_two'),
	standButton: document.getElementById('stand'),
	playAgainButton: document.getElementById('playagain'),
	fundsButton: document.getElementById('passFunds'),
	fundsAgainButton: document.getElementById('passFundsAgain'),
	insurance: document.getElementById('insurance'),
	dealerPoints: document.getElementById('dealerPoints'),
	playerPoints: document.getElementById('playerPoints'),
	playerPoints_two: document.getElementById('playerPoints_two'),
	playerPoints_two_wrap: document.getElementById('playerPoints_two_wrap'),
	player: player,
	table: table,
	messageBox,
	bankMessage,
	vol: document.getElementById('vol'),
	amount: document.getElementById('amount'),
	bet: bet,
	bet_two: bet_two,
	bet_two_wrap: bet_two_wrap,
	funds: funds,
	betAsk,
	betDisplay: document.getElementById('betAmount'),
	betSet: document.getElementById('volBet'),
	passBet: document.getElementById('passBet'),
	insuranceBox,
	insFund: document.getElementById('insFund'),
	insCancel: document.getElementById('insCancel'),
	insuranceWrap: document.getElementById('insurance_wrap'),
	insuranceAmo: document.getElementById('insurance_amount'),
	double: document.getElementById('double'),
	split: document.getElementById('split'),
	info: document.getElementById('info'),
	insurance_info: document.getElementById('insurance_info'),
	split_info: document.getElementById('split_info'),
});

game.run();
