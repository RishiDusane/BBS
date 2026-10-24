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

module.exports = {
  addUser,
  getUsers,
};
