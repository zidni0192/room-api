const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, clientController.getAllClients);
router.post('/', verifyToken, clientController.createClient);
router.get('/:id', verifyToken, clientController.getClientById);
router.put('/:id', verifyToken, clientController.updateClient);
router.delete('/:id', verifyToken, clientController.deleteClient);

module.exports = router;
