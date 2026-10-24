const { Op } = require('sequelize');
const { Bus } = require('../models');

const addBus = async (req, res) => {
  const { busID, busNumber, totalSeats, availableSeats } = req.body || {};
  const normalizedBusNumber =
    typeof busNumber === 'string' || Number.isInteger(busNumber)
      ? String(busNumber).trim()
      : '';

  if (
    (busID !== undefined && (!Number.isInteger(busID) || busID < 1)) ||
    !normalizedBusNumber ||
    normalizedBusNumber.length > 20 ||
    !Number.isInteger(totalSeats) ||
    !Number.isInteger(availableSeats) ||
    totalSeats < 1 ||
    availableSeats < 0 ||
    availableSeats > totalSeats
  ) {
    return res.status(400).send('Please provide valid bus details.');
  }

  try {
    const bus = await Bus.create({
      ...(busID === undefined ? {} : { busID }),
      busNumber: normalizedBusNumber,
      totalSeats,
      availableSeats,
    });
    return res.status(201).json({
      busID: bus.busID,
      message: `Bus ${normalizedBusNumber} was added successfully.`,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).send('A bus with this ID already exists.');
    }

    console.error('Error adding bus:', error);
    return res.status(500).send('Error adding bus.');
  }
};

const getBusBookings = async (req, res) => {
  const busId = Number(req.params.id);

  if (!Number.isInteger(busId) || busId < 1) {
    return res.status(400).send('Please provide a valid bus ID.');
  }

  try {
    const bus = await Bus.findByPk(busId, {
      attributes: ['busID'],
      include: [
        {
          association: 'bookings',
          attributes: ['BookingId', 'seatNumber'],
          include: [{ association: 'user', attributes: ['name', 'email'] }],
        },
      ],
    });

    if (!bus) {
      return res.status(404).send('Bus not found.');
    }

    return res.status(200).json(
      bus.bookings.map(({ BookingId, seatNumber, user }) => ({
        id: BookingId,
        seatNumber,
        user,
      })),
    );
  } catch (error) {
    console.error('Error getting bus bookings:', error);
    return res.status(500).send('Error getting bus bookings.');
  }
};

const getAvailableBuses = async (req, res) => {
  const seats = Number(req.params.seats);

  if (!Number.isInteger(seats) || seats < 0) {
    return res.status(400).send('Please provide a valid number of seats.');
  }

  try {
    const buses = await Bus.findAll({
      where: {
        availableSeats: {
          [Op.gt]: seats,
        },
      },
    });
    return res.status(200).json(buses);
  } catch (error) {
    console.error('Error getting buses:', error);
    return res.status(500).send('Error getting buses.');
  }
};

module.exports = {
  addBus,
  getBusBookings,
  getAvailableBuses,
};
