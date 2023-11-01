const express = require('express');
const router = express.Router();
const PatrocinadoresController = require('../controllers/PatrocinadoresController');

const AuthMiddleware = require('../middleware/AuthMiddleware.js'); // Importe o middleware
router.use(AuthMiddleware);

// router.get('/', PatrocinadoresController.list);
router.post('/', PatrocinadoresController.create);
// router.get('/:id', PatrocinadoresController.get);
router.put('/:id', PatrocinadoresController.update);
router.delete('/:id', PatrocinadoresController.delete);

module.exports = router;