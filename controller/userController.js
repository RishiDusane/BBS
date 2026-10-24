const { User } = require('../models');

const addUser = async (req, res) => {
  const { name, email } = req.body || {};

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim()
  ) {
    return res.status(400).send('Please provide a name and email.');
  }

  try {
    const user = await User.create({ name: name.trim(), email: email.trim() });
    return res.status(201).json({
      id: user.id,
      message: `User ${user.name} was added successfully.`,
    });
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).send('Error adding user.');
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).send('Error getting users.');
  }
};

const getUserBookings = async (req, res) => {
  const userId = Number(req.params.id);

  if (!Number.isInteger(userId) || userId < 1) {
    return res.status(400).send('Please provide a valid user ID.');
  }

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id'],
      include: [
        {
          association: 'bookings',
          attributes: ['BookingId', 'seatNumber'],
          include: [{ association: 'bus', attributes: ['busNumber'] }],
        },
      ],
    });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    return res.status(200).json(
      user.bookings.map(({ BookingId, seatNumber, bus }) => ({
        id: BookingId,
        seatNumber,
        bus,
      })),
    );
  } catch (error) {
    console.error('Error getting user bookings:', error);
    return res.status(500).send('Error getting user bookings.');
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserBookings,
};
