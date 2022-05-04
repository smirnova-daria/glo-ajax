const form = document.querySelector('form')
const valueInput = form.querySelector('#value')
const progressBlock = form.querySelector('.progress')

const myHeaders = new Headers();
myHeaders.append("apikey", "Igd1tNIl3IX2mtOxs7676F3FuhbS4roc");

const requestOptions = {
	method: 'GET',
	redirect: 'follow',
	headers: myHeaders
};

const getData = (url) => {
	return fetch(url, requestOptions)
		.then(response => response.json())
		.catch(error => {
			console.log('error', error)
			progressBlock.textContent = 'Ошибка запроса'
		});
}

const submitForm = () => {
	const formData = new FormData(form)
	const formBody = {}

	formData.forEach((val, key) => {
		formBody[key] = val
	})

	const url = `https://api.apilayer.com/exchangerates_data/convert?to=${formBody.curSymbolTo}&from=${formBody.curSymbolFrom}&amount=${+formBody.amount}`

	progressBlock.textContent = 'Отправляем запрос...'

	getData(url).then(data => {
		if (data.success) {
			valueInput.value = Math.floor(data.result * 100) / 100
			progressBlock.textContent = ''
		}
	}).catch(error => {
		console.log(error.message)
		progressBlock.textContent = 'Ошибка запроса'
	})
}

form.addEventListener('input', e => {
	if (e.target.name === 'amount' && e.target.value == 0) {
		progressBlock.textContent = 'Введите число больше нуля!'
	} else {
		progressBlock.textContent = ''
		return
	}
})

form.addEventListener('submit', (e) => {
	e.preventDefault()
	submitForm()
})