const path = require('path')
const dotenv = require('dotenv').config({
	path: path.join(__dirname, '..', '..', '.env'),
})
const fs = require('fs')

const NPS_KEY = process.env.NPS_KEY
const NPS_URL = process.env.NPS_URL

let data = []

try {
	let data1 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse1.json'))
	)
	data = [...data, ...data1.data]
} catch (error) {
	console.log(('Response 1 File Read Error: ', error.message))
}

try {
	let data2 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse2.json'))
	)
	data = [...data, ...data2.data]
} catch (error) {
	console.log(('Response 2 File Read Error: ', error.message))
}

try {
	let data3 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse3.json'))
	)
	data = [...data, ...data3.data]
} catch (error) {
	console.log(('Response 3 File Read Error: ', error.message))
}

try {
	let data4 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse4.json'))
	)
	data = [...data, ...data4.data]
} catch (error) {
	console.log(('Response 4 File Read Error: ', error.message))
}

try {
	let data5 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse5.json'))
	)
	data = [...data, ...data5.data]
} catch (error) {
	console.log(('Response 5 File Read Error: ', error.message))

}

try {
	let data6 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse6.json'))
	)
	data = [...data, ...data6.data]
} catch (error) {
	console.log(('Response 6 File Read Error: ', error.message))
}
try {
	let data7 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse7.json'))
	)
	data = [...data, ...data7.data]
} catch (error) {
	console.log(('Response 7 File Read Error: ', error.message))
}
try {
	let data8 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse8.json'))
	)
	data = [...data, ...data8.data]
} catch (error) {
	console.log(('Response 8 File Read Error: ', error.message))
}
try {
	let data9 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse9.json'))
	)
	data = [...data, ...data9.data]
} catch (error) {
	console.log(('Response 9 File Read Error: ', error.message))
}
try {
	let data10 = JSON.parse(
		fs.readFileSync(path.join(__dirname, '.', 'NPSResponses/NPSresponse10.json'))
	)
	data = [...data, ...data10.data]
} catch (error) {
	console.log(('Response 10 File Read Error: ', error.message))
}

module.exports = data;