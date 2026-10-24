const express = require('express');
const bookingController = require('../controller/bookingController');

const router = express.Router();

router.post('/', bookingController.addBooking);

module.exports = router;
