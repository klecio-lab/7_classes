const express = require('express');
const router = express.Router();
const LocaisController = require('../controllers/LocaisController');

const AuthMiddleware = require('../middleware/AuthMiddleware.js'); // Importe o middleware
router.use(AuthMiddleware);

router.get('/', LocaisController.list);
router.post('/', LocaisController.create);
router.get('/:id', LocaisController.get);
router.put('/:id', LocaisController.update);
router.delete('/:id', LocaisController.delete);

module.exports = router;