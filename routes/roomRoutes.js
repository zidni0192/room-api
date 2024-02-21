const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, roomController.getAllRooms);
router.get('/usages', verifyToken, roomController.roomUsages);
router.post('/booking', verifyToken, roomController.bookRoom);
router.post('/', verifyToken, roomController.createRoom);
router.get('/:id', verifyToken, roomController.getRoomById);
router.put('/:id', verifyToken, roomController.updateRoom);
router.delete('/:id', verifyToken, roomController.deleteRoom);

module.exports = router;
