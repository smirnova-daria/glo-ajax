const select = document.querySelector('select')
const dataBlock = document.querySelector('.data')

const getData = () => {
	return fetch('db.json')
		.then(res => res.json())
		.catch(error => {
			console.log("Ошибка: " + error.message)
		})
}

select.addEventListener('change', (e) => {
	getData().then(data => {
		const selectedData = data.cars.filter(car => car.brand === e.target.value)
		try {
			if (selectedData.length === 0) {
				throw new Error('Автомобиль не выбран')
			}
			dataBlock.innerHTML = ''
			dataBlock.innerHTML = `
				<p>Автомобиль ${selectedData[0].brand} ${selectedData[0].model} </p>
				<p>Цена ${selectedData[0].price}$</p>
			`
		} catch (error) {
			dataBlock.innerHTML = ''
			dataBlock.innerHTML = `<p>${error}</p>`
		}
	}).catch(error => {
		console.log("Ошибка: " + error.message)
	})
})