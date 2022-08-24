const express = require('express');
const router = express.Router()

router.post('/', (req, res) => {
    req.json([])
})

module.exports = router