const express = require('express');
const router = express.Router();
const EventosController = require('../controllers/EventosController');

const AuthMiddleware = require('../middleware/AuthMiddleware.js'); // Importe o middleware
router.use(AuthMiddleware);

router.get('/', EventosController.list);
router.post('/', EventosController.create);
router.get('/:id', EventosController.get);
router.put('/:id', EventosController.update);
router.delete('/:id', EventosController.delete);

module.exports = router;