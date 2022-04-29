const json = JSON.stringify({
	"user": "Vlad",
	"age": 33,
	"role": "developer"
})

const xhr = new XMLHttpRequest()
xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.send(json)

xhr.onload = () => {
	console.log('Данные отправлены')
	console.log(JSON.parse(xhr.response));
}