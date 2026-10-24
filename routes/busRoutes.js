const express = require('express');
const busController = require('../controller/busController');

const router = express.Router();

router.post('/', busController.addBus);
router.get('/available/:seats', busController.getAvailableBuses);
router.get('/:id/bookings', busController.getBusBookings);

module.exports = router;
