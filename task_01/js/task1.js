"use strict"
if (confirm("Почати тестування?")) {
	// Крок 0. Введення даних, позначення величин

	class TDate {
		// Створюємо приватні поля
		#days
		#months
		#years
		// Описуємо геттери та сеттери
		get Days() {
			return this.#days
		}
		set Days(initDays) {
			if (initDays < 1 || initDays > 31) throw new Error(`Значення дня ${initDays} не є коректним!`)
			else this.#days = initDays
		}
		get Months() {
			return this.#months
		}
		set Months(initMonths) {
			if (initMonths < 1 || initMonths > 12) throw new Error(`Значення місяця ${initMonths} не є коректним!`)
			else this.#months = initMonths
		}
		get Years() {
			return this.#years
		}
		set Years(initYears) {
			if (initYears < 0) throw new Error(`Значення року ${initYears} не є коректним!`)
			else this.#years = initYears
		}
		// Описуємо конструктор
		constructor(initDays, initMonths, initYears) {
			this.Days = initDays
			this.Months = initMonths
			this.Years = initYears
		}
		// Описуємо методи
		// отримуємо кількість днів у певному місяці
		getNumberDayInMonth(month, year) {
			const leapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
			switch (month) {
				case 2:
					return leapYear ? 29 : 28
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					return 31
				default:
					return 30
			}
		}
		// збільшуємо дні
		increaseDays(n = 1) {
			let resDays = this.Days + n
			while (resDays > this.getNumberDayInMonth(this.Months, this.Years)) {
				resDays -= this.getNumberDayInMonth(this.Months, this.Years)
				this.Months++
			}
			this.Days = resDays
		}
		// зменшуємо дні
		decreaseDays(n = 1) {
			let resDays = this.Days - n
			while (resDays < 1) {
				this.Months--
				resDays += this.getNumberDayInMonth(this.Months, this.Years)
			}
			this.Days = resDays
		}
		// збільшуємо місяці
		increaseMonths(n = 1) {
			let resMonths = this.Months + n
			if (resMonths > 12) {
				this.Months = resMonths % 12
				this.Years++
			} else this.Months = resMonths
		}
		// зменшуємо місяці
		decreaseMonths(n = 1) {
			let resMonths = this.Months - n
			if (resMonths < 1) {
				this.Months = 12 + resMonths
				this.Years--
			} else this.Months = resMonths
		}
		// збільшуємо роки
		increaseYears(n = 1) {
			return (this.Years += n)
		}
		// зменшуємо роки
		decreaseYears(n = 1) {
			return (this.Years -= n)
		}
		toString() {
			return `${this.Days} : ${this.Months} : ${this.Years}`
		}
	}

	// Крок 1. Обчислення результатів

	// крок 2. Виведення результатів

	try {
		const customDate = new TDate(30, 9, 2024)
		document.write(`<div class="container">`)
		document.write(`<p>${customDate}</p>`)
		// customDate.increaseDays(16)
		customDate.decreaseDays(32)
		// customDate.increaseMonths(5)
		// customDate.decreaseMonths(15)
		// customDate.increaseYears(10)
		// customDate.decreaseYears(10)
		document.write(`<p>${customDate}</p>`)
		document.write(`</div>`)
	} catch (error) {
		console.log(error)
	}
}
