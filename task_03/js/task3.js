"use strict"
if (confirm("Почати тестування?")) {
	// Введення даних, позначення величин

	// Клас послуг
	class Service {
		constructor(serviceTitle, servicePrice, serviceDeadline) {
			this.serviceTitle = serviceTitle
			this.servicePrice = servicePrice
			this.serviceDeadline = serviceDeadline
		}
		toString() {
			return `Назва послуги: "${this.serviceTitle}", ціна послуги: ${this.servicePrice} грн., термін виконання: ${this.serviceDeadline} тижнів`
		}
	}

	// Клас адрес філіалів
	class AddressOfBranch {
		constructor(country, city, street, houseNumber) {
			this.country = country
			this.city = city
			this.street = street
			this.houseNumber = houseNumber
		}
		toString() {
			return `Країна: "${this.country}", місто: ${this.city}, вулиця: ${this.street}, номер будинку: ${this.houseNumber}`
		}
	}

	class Company {
		constructor(initTitle, initYear, initMonth) {
			this.title = initTitle
			this.foundationDate = {
				year: initYear,
				month: initMonth,
			}
			this.services = []
			this.addresses = []
		}
		// Метод додавання нових послуг
		addServices(...newServices) {
			this.services.push(...newServices)
		}
		// Метод додавання нових адрес філіалів
		addAddresses(...newAddresses) {
			this.addresses.push(...newAddresses)
		}
		// Метод визначення кількості років з року заснування
		getYearsOfCompany(currentYear) {
			return currentYear - this.foundationDate.year
		}
		// Метод виведення адрес філіалів у місті
		showAddressesInTheCity(city) {
			return this.addresses
				.filter((address) => address.city === city)
				.map((address) => `<p>вулиця: ${address.street}, номер будинку: ${address.houseNumber}</p><br/>`)
				.join("")
		}
		// Метод виведення доступних послуг за вказані гроші та терміни виконання
		showAvailableServices(price, deadline) {
			return this.services
				.filter((service) => service.servicePrice <= price && service.serviceDeadline <= deadline)
				.map(
					(service) =>
						`<p>Послуга: ${service.serviceTitle} за ціною ${service.servicePrice} грн., термін виконання: ${service.serviceDeadline} тижнів</p><br/>`
				)
				.join("")
		}
		toString() {
			return `Компанія ${this.title} заснована у ${this.foundationDate.year} році`
		}
	}

	// Обчислення результатів

	const branchAddress1 = new AddressOfBranch("Україна", "Львів", "Стрийська", 29)
	const branchAddress2 = new AddressOfBranch("Україна", "Ужгород", "Мукачівська", 3)
	const branchAddress3 = new AddressOfBranch("Україна", "Ужгород", "Легоцького", 74)

	const companyService1 = new Service("Створення сайту", 40000, 4)
	const companyService2 = new Service("Просування сайту", 20000, 8)
	const companyService3 = new Service("Супровід сайту", 10000, 2)

	const ourCompany = new Company("CodeAwards", 2019, 11)
	ourCompany.addAddresses(branchAddress1, branchAddress2, branchAddress3)
	ourCompany.addServices(companyService1, companyService2, companyService3)

	// Виведення результатів

	document.write(`<div class="container">`)
	document.write(`<p>${ourCompany}</p>`)
	document.write(`<p>Філіали у м. Ужгород:</p>`)
	document.write(`${ourCompany.showAddressesInTheCity("Ужгород")}`)
	document.write(`${ourCompany.showAvailableServices(20000, 8)}`)
	document.write(`</div>`)
}
