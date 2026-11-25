const express = require('express');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

// GET /api/produtos  ->  lista a vitrine
router.get('/', produtoController.listarVitrine);

module.exports = router;