const express = require('express');
const router = express.Router();
const AvaliacoesController = require('../controllers/AvaliacoesController');

const AuthMiddleware = require('../middleware/AuthMiddleware.js'); // Importe o middleware
router.use(AuthMiddleware);

// router.get('/', AvaliacoesController.list);
router.post('/', AvaliacoesController.create);
router.get('/:id', AvaliacoesController.get);
router.put('/:id', AvaliacoesController.update);
router.delete('/:id', AvaliacoesController.delete);

module.exports = router;