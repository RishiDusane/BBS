const { Booking, Bus, User } = require('../models');

const addBooking = async (req, res) => {
  const { userId, busId, seatNumber } = req.body || {};

  if (
    !Number.isInteger(userId) ||
    userId < 1 ||
    !Number.isInteger(busId) ||
    busId < 1 ||
    !Number.isInteger(seatNumber) ||
    seatNumber < 1
  ) {
    return res.status(400).send('Please provide valid user, bus, and seat details.');
  }

  try {
    const [user, bus] = await Promise.all([
      User.findByPk(userId),
      Bus.findByPk(busId),
    ]);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    if (!bus) {
      return res.status(404).send('Bus not found.');
    }

    const booking = await Booking.create({ userId, busId, seatNumber });
    return res.status(201).json({
      id: booking.BookingId,
      userId: booking.userId,
      busId: booking.busId,
      seatNumber: booking.seatNumber,
    });
  } catch (error) {
    console.error('Error adding booking:', error);
    return res.status(500).send('Error adding booking.');
  }
};

module.exports = { addBooking };
