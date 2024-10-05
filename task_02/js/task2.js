"use strict"
if (confirm("Почати тестування?")) {
	// Крок 0. Введення даних, позначення величин

	class TMoney {
		// Створюємо приватні поля
		#dollarAmount
		#exchangeRate
		// Описуємо геттери та сеттери
		get DollarAmount() {
			return this.#dollarAmount
		}
		set DollarAmount(initAmount) {
			if (initAmount < 0 || isNaN(initAmount)) throw new Error(`Значення суми ${initAmount} не є коректним!`)
			else this.#dollarAmount = initAmount
		}
		get ExchangeRate() {
			return this.#exchangeRate
		}
		set ExchangeRate(initRate) {
			if (initRate <= 0 || isNaN(initRate)) throw new Error(`Значення курсу ${initRate} не є коректним!`);
			else this.#exchangeRate = initRate
		}
		// Описуємо конструктор
		constructor(dollarAmount, exchangeRate) {
			this.DollarAmount = dollarAmount
			this.ExchangeRate = exchangeRate
		}
		// Описуємо методи
		// додавання у гривнях
		addMoneyInUAH(amountInUAH) {
			if(amountInUAH < 0 || isNaN(amountInUAH)) throw new Error(`Значення кількості ${amountInUAH} не є коректним!`);
			else this.DollarAmount += amountInUAH / this.ExchangeRate
		}
		// вилучення у гривнях
		subtractMoneyInUAH(amountInUAH) {
			if(amountInUAH <= 0 || amountInUAH / this.ExchangeRate > this.DollarAmount) throw new Error(`Значення суми ${amountInUAH} не є коректним або є більшим за наявну суму! На рахунку лише ${this.DollarAmount.toFixed(2)} USD.`);
			else this.DollarAmount -= amountInUAH / this.ExchangeRate
			return true
		}
		// визначення курсу, при якому сума у грн збільшиться на 100
		calculateRateForUAHIncrease(increase = 100) {
			return (increase + this.DollarAmount * this.ExchangeRate) / this.DollarAmount
		}
		toString() {
			return `На рахунку ${this.DollarAmount.toFixed(2)} USD, курс ${this.ExchangeRate}`
		}
	}

	// Крок 1. Обчислення результатів

	// крок 2. Виведення результатів

	try {
		const moneyAccount = new TMoney(50, 41)
		document.write(`<div class="container">`)
		document.write(`<p>${moneyAccount}</p>`)
		// moneyAccount.addMoneyInUAH(345)
		// moneyAccount.subtractMoneyInUAH(6000)
		document.write(`<p>Курс, з яким кількість грн збільшиться на 100: ${moneyAccount.calculateRateForUAHIncrease(100)}</p>`)
		moneyAccount.subtractMoneyInUAH(600)
		document.write(`<p>${moneyAccount}</p>`)
		document.write(`</div>`)
	} catch (error) {
		console.log(error)
	}
}
