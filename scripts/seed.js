const { sequelize, User, Bus, Booking } = require('../models');

const seed = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

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
    { busID: 1, busNumber: 'MH12AB1234', totalSeats: 40, availableSeats: 35 },
    { busID: 2, busNumber: 'MH14CD5678', totalSeats: 50, availableSeats: 42 },
  ];

  for (const busData of buses) {
    const existingBus = await Bus.findByPk(busData.busID);
    if (!existingBus) {
      await Bus.create(busData);
    }
  }

  const user = await User.findOne({ where: { email: 'rishi@gmail.com' } });
  const bus = await Bus.findByPk(1);
  if (user && bus) {
    const existingBooking = await Booking.findOne({
      where: { userId: user.id, busId: bus.busID, seatNumber: 5 },
    });
    if (!existingBooking) {
      await Booking.create({ userId: user.id, busId: bus.busID, seatNumber: 5 });
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
