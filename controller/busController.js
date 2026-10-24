const { Op } = require('sequelize');
const { Bus } = require('../models');

const addBus = async (req, res) => {
  const { busID, busNumber, totalSeats, availableSeats } = req.body || {};

  if (
    !Number.isInteger(busID) ||
    !Number.isInteger(busNumber) ||
    !Number.isInteger(totalSeats) ||
    !Number.isInteger(availableSeats) ||
    busID < 1 ||
    busNumber < 1 ||
    totalSeats < 1 ||
    availableSeats < 0 ||
    availableSeats > totalSeats
  ) {
    return res.status(400).send('Please provide valid bus details.');
  }

  try {
    await Bus.create({ busID, busNumber, totalSeats, availableSeats });
    return res.status(201).json({
      message: `Bus ${busNumber} was added successfully.`,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).send('A bus with this ID already exists.');
    }

    console.error('Error adding bus:', error);
    return res.status(500).send('Error adding bus.');
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
  getAvailableBuses,
};
