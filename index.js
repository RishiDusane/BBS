const express = require('express');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const { sequelize } = require('./models');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bus booking server is running!');
});

app.use('/users', userRoutes);
app.use('/buses', busRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const port = process.env.PORT || 3000;
    return app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exitCode = 1;
    return null;
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
