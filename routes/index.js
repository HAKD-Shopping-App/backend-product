const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/searchByCategory', actions.searchByCategory)

module.exports = router