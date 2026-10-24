const { sequelize, User, Bus } = require('../models');

const seed = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  const users = [
    { name: 'Rishi Dusane', email: 'rishi@gmail.com' },
    { name: 'Rahul Sharma', email: 'rahul@gmail.com' },
    { name: 'Priya Patil', email: 'priya@gmail.com' },
  ];

  for (const userData of users) {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (!existingUser) {
      await User.create(userData);
    }
  }

  const buses = [
    { busID: 1, busNumber: 101, totalSeats: 40, availableSeats: 35 },
    { busID: 2, busNumber: 102, totalSeats: 50, availableSeats: 42 },
  ];

  for (const busData of buses) {
    const existingBus = await Bus.findByPk(busData.busID);
    if (!existingBus) {
      await Bus.create(busData);
    }
  }
};

seed()
  .catch((error) => {
    console.error('Unable to seed sample data:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
