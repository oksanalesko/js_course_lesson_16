"use strict"
if (confirm("Почати тестування?")) {
	// Введення даних, позначення величин

	class Banknotes {
		#nominal
		#amount
		get Nominal() {
			return this.#nominal
		}
		set Nominal(initNominal) {
			const validNominals = [5, 10, 20, 50, 100, 200]
			if (!validNominals.includes(initNominal) || isNaN(initNominal))
				throw new Error(`Значення номіналу купюри ${initNominal} не є коректним!`)
			else this.#nominal = initNominal
		}
		get Amount() {
			return this.#amount
		}
		set Amount(initAmount) {
			if (initAmount < 0 && isNaN(initAmount))
				throw new Error(`Значення кількості купюр ${initAmount} не є коректним!`)
			else this.#amount = initAmount
		}
		constructor(initNominal, initAmount) {
			this.Nominal = initNominal
			this.Amount = initAmount
		}
		toString() {
			return `${this.Nominal} - ${this.Amount}`
		}
	}

	class TBankomat {
		constructor(banknotesList) {
			// Використовуємо упорядкований масив купюр
			this.banknotesList = this.getSortedBanknotesList(banknotesList)
			this.maxSum = this.getMaxSum()
		}
		// Упорядковуємо масив купюр за спаданням номіналів
		getSortedBanknotesList(list) {
			let newList = [...list]
			newList.sort((banknote1, banknote2) => banknote2.Nominal - banknote1.Nominal)
			return newList
		}
		getMaxSum() {
			// Знаходимо максимальну суму для видачі (суму всіх наявних банкнот)
			return this.banknotesList.reduce((prevSum, banknote) => prevSum + banknote.Nominal * banknote.Amount, 0)
		}
		getMinSum() {
			// Знаходимо мінімальний номінал серед банкнот з кількістю більше 0
			let minSum = this.banknotesList.reduce(
				(prevMinNom, banknote) =>
					banknote.Amount > 0 && banknote.Nominal < prevMinNom ? banknote.Nominal : prevMinNom,
				+Infinity
			)
			return isFinite(minSum) ? minSum : 0
		}
		// Метод зняття деякої суми
		// Самостійно не змогла розв'язати це завдання, використала підказки з наступного уроку
		// Метод для оцінки, які купюри є, щоб можна було видати
		getNotesForRequiredSum(sumInUAH) {
			// отримати масив купюр, які треба видати, щоб отриати потрібну суму у гривнях
			let requiredNotesList = []
			for (const note of this.banknotesList) {
				if (note.Amount > 0 && sumInUAH >= note.Nominal) {
					// шукаємо, скільки купюр цього номіналу треба видати і чи є у нас стільки купюр цього номіналу
					let requiredNotesNumber = Math.min(note.Amount, Math.floor(sumInUAH / note.Nominal))
					requiredNotesList.push({
						note,
						requiredNotesNumber,
					})
					// Відповідно зменшуємо суму на кількість, що видали тими купюрами
					sumInUAH -= note.Nominal * requiredNotesNumber
					// якщо сума вже дорівнює 0, перериваємо роботу циклу
					if (sumInUAH === 0) break
				}
			}
			return sumInUAH === 0 ? requiredNotesList : null
		}
		// Метод зняття суми
		withdrawMoney(sumInUAH) {
			// перевіряємо, чи достатньо коштів у банкоматі для видачі суми
			if (this.maxSum < sumInUAH) throw new Error(`У банкоматі недостатньо коштів для видачі требуваної суми ${sumInUAH} грн.`)
			//
			let requiredNotesList = this.getNotesForRequiredSum(sumInUAH)
			if (requiredNotesList) {
				for (const { note, requiredNotesNumber } of requiredNotesList) {
					console.log(`${note.Nominal} : ${requiredNotesNumber}`)
					note.Amount -= requiredNotesNumber
				}
				this.maxSum -= sumInUAH
				return true
			} else throw new Error("Банкомат не має потрібної кількості купюр");
			
		}
		toString() {
			return this.banknotesList
				.map((banknote) => `Номінал ${banknote.Nominal} грн. - ${banknote.Amount} шт.`)
				.join(", ")
		}
	}

	// Обчислення результатів

	try {
		const banknotesList = [
			new Banknotes(5, 35),
			// new Banknotes(5, 0),
			new Banknotes(10, 71),
			// new Banknotes(11, 71),
			new Banknotes(20, 28),
			new Banknotes(50, 45),
			new Banknotes(100, 29),
			new Banknotes(200, 2),
		]
		console.log(banknotesList)

		const ATMbankomat = new TBankomat(banknotesList)
		// console.log(ATMbankomat)

		// Виведення результатів

		document.write(`<div class="container">`)
		document.write(`<p>${ATMbankomat}</p>`)
		document.write(`<p>Мінімальна сума до видачі - ${ATMbankomat.getMinSum()} грн.</p>`)
		document.write(`<p>Максимальна сума до видачі - ${ATMbankomat.getMaxSum()} грн.</p>`)
		if(ATMbankomat.withdrawMoney(750)) document.write(`<p>Заберіть свої гроші</p>`)
		// ATMbankomat.withdrawMoney(62)
		document.write(`<p>Максимальна сума до видачі після зняття - ${ATMbankomat.getMaxSum()} грн.</p>`)
		document.write(`</div>`)
	} catch (error) {
		document.write(`<p>${error.message}</p>`)
	}
}
