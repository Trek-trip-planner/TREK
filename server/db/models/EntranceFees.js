const Sequelize = require('sequelize')
const db = require('../db')

const EntranceFees = db.define('entranceFees', {
	cost: {
		type: Sequelize.FLOAT,
	},
	description: {
		type: Sequelize.TEXT,
	},
	title: {
		type: Sequelize.STRING,
	},
  npsParkId: Sequelize.STRING
})

module.exports = EntranceFees
