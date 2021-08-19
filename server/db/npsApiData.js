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
