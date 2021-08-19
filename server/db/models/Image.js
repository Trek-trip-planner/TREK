const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
	credit: {
		type: Sequelize.STRING,
	},
	title: {
		type: Sequelize.STRING,
	},
	altText: {
		type: Sequelize.STRING,
	},
	caption: {
		type: Sequelize.STRING,
	},
	url: {
		type: Sequelize.TEXT,
	},
	npsParkId: Sequelize.STRING,
})

module.exports = Image
