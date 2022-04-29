const getData = (url) => {
	return fetch(url)
		.then(response => {
			console.log('Данные получены из ' + url)
			return response.json()
		})
}

const sendData = ({
	url,
	data,
	method
}) => {
	return fetch(url, {
		method: method,
		body: data,
		headers: {
			'Content-type': 'application/json;charset=utf-8'
		}
	}).then(response => {
		console.log('Данные отправлены на ' + url)
		return response.json()
	})
}

getData('db.json')
	.then(data => {
		console.log(data)
		return sendData({
			url: 'https://jsonplaceholder.typicode.com/posts',
			data: JSON.stringify(data),
			method: 'POST'
		})
	})
	.then(data => console.log(data))
	.catch(error => console.log('Ошибка: ' + error))