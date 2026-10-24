require('dotenv').config({ quiet: true });

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'bus',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
  },
);

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

const Bus = sequelize.define(
  'Bus',
  {
    busID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    busNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'buses',
    timestamps: false,
  },
);

const Booking = sequelize.define(
  'Booking',
  {
    BookingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'bookings',
    timestamps: false,
  },
);

User.hasMany(Booking, { as: 'bookings', foreignKey: 'userId' });
Booking.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Bus.hasMany(Booking, { as: 'bookings', foreignKey: 'busId', sourceKey: 'busID' });
Booking.belongsTo(Bus, { as: 'bus', foreignKey: 'busId', targetKey: 'busID' });

const Payment = sequelize.define(
  'Payment',
  {
    PaymentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    paymentStatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: 'payments',
    timestamps: false,
  },
);

module.exports = {
  sequelize,
  User,
  Bus,
  Booking,
  Payment,
};
