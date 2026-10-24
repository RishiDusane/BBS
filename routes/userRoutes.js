const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.getUsers);
router.get('/:id/bookings', userController.getUserBookings);

module.exports = router;
