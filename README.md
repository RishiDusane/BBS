# Bus Booking API

This project uses Express, Sequelize, and MySQL. The files are organized like this:

- `index.js` starts the server and sets up the URLs.
- `models/index.js` configures Sequelize and defines the User, Bus, Booking, and Payment models.
- `controller/userController.js` contains the Sequelize user queries.
- `controller/busController.js` contains the Sequelize bus queries.
- `routes/userRoutes.js` contains the user routes.
- `routes/busRoutes.js` contains the bus routes.

## Start the server

Create the MySQL database first (the default name is `bus`). Set your MySQL password in PowerShell before starting:

```powershell
$env:DB_PASSWORD = "<your MySQL password>"
$env:DB_NAME = "bus"
npm start
```

Sequelize creates any missing tables when the server starts. You can also set `DB_HOST`, `DB_PORT`, and `DB_USER` if your MySQL settings are different. To add the sample three users and two buses, run `npm run seed`; existing sample records are skipped.

## API routes

- `POST http://localhost:3000/users` adds a user. Example JSON:
  `{"name":"Sam Lee","email":"sam@example.com"}`
- `GET http://localhost:3000/users` gets all users.
- `POST http://localhost:3000/buses` adds a bus. Example JSON:
  `{"busID":6,"busNumber":106,"totalSeats":40,"availableSeats":32}`
- `GET http://localhost:3000/buses/available/10` gets buses with more than 10 available seats.

For POST requests in Postman, choose **Body > raw > JSON**.
