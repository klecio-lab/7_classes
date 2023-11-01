const express = require('express');
const router = express.Router();
const ComentariosController = require('../controllers/ComentariosController');

const AuthMiddleware = require('../middleware/AuthMiddleware.js'); // Importe o middleware
router.use(AuthMiddleware);

// router.get('/', ComentariosController.list);
router.post('/', ComentariosController.create);
router.get('/:id', ComentariosController.get);
router.put('/:id', ComentariosController.update);
router.delete('/:id', ComentariosController.delete);

module.exports = router;