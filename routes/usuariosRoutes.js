const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');

const AuthMiddleware = require('../middleware/AuthMiddleware.js'); // Importe o middleware
router.use(AuthMiddleware);

// router.get('/', UsuariosController.list);
// router.post('/', UsuariosController.create);
router.get('/:id', UsuariosController.get);
router.put('/:id', UsuariosController.update);
// router.delete('/:id', UsuariosController.delete);

module.exports = router;