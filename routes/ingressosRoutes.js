const express = require('express');
const router = express.Router();
const IngressosController = require('../controllers/IngressosController');

const AuthMiddleware = require('../middleware/AuthMiddleware.js'); // Importe o middleware
router.use(AuthMiddleware);

router.get('/', IngressosController.list);
// router.post('/', IngressosController.create);
router.get('/:id', IngressosController.get);
router.put('/:id', IngressosController.update);
// router.delete('/:id', IngressosController.delete);

module.exports = router;