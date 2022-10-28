const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()
const createError = require('http-errors');

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/product', actions.addProduct)
router.get('/products', actions.getProducts)
router.get('/products/:id', actions.getProductById)
router.put('/product/:id', actions.updateProduct)
router.delete('/product/:id', actions.deleteProduct)
router.get('/searchByCategory', actions.searchByCategory)

module.exports = router