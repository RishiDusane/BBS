# Bus Booking API

This project uses Express, Sequelize, and MySQL. The files are organized like this:

- `index.js` starts the server and sets up the URLs.
- `models/index.js` configures Sequelize and defines the User, Bus, Booking, and Payment models.
- `controller/userController.js` contains the Sequelize user queries.
- `controller/busController.js` contains the Sequelize bus queries.
- `controller/bookingController.js` contains the Sequelize booking queries.
- `routes/userRoutes.js` contains the user routes.
- `routes/busRoutes.js` contains the bus routes.
- `routes/bookingRoutes.js` contains the booking routes.

## Associations and foreign keys

A foreign key stores the ID of a related row and is constrained to reference an existing record. Here, `Booking.userId` references `User.id` and `Booking.busId` references `Bus.busID`. This links every booking to one valid user and bus. `User.hasMany(Booking)` and `Bus.hasMany(Booking)` represent one-to-many relationships; each booking `belongsTo` one user and one bus. Sequelize syncs the model associations when the server starts.

## Start the server

Create the MySQL database first (the default name is `bus`). Set your MySQL password in PowerShell before starting:

```powershell
$env:DB_PASSWORD = "<your MySQL password>"
$env:DB_NAME = "bus"
npm start
```

Sequelize creates missing tables and synchronizes the model schema when the server starts. You can also set `DB_HOST`, `DB_PORT`, and `DB_USER` if your MySQL settings are different. To add sample users, buses, and a linked booking, run `npm run seed`; existing sample records are skipped.

## API routes

- `POST http://localhost:3000/users` adds a user. Example JSON:
  `{"name":"John Doe","email":"john@example.com"}`
- `GET http://localhost:3000/users` gets all users.
- `POST http://localhost:3000/buses` adds a bus. The ID is generated automatically. Example JSON:
  `{"busNumber":"MH12AB1234","totalSeats":40,"availableSeats":30}`
- `GET http://localhost:3000/buses/available/10` gets buses with more than 10 available seats.
- `POST http://localhost:3000/bookings` creates a booking after its user and bus exist. Example JSON:
  `{"userId":1,"busId":1,"seatNumber":10}`
- `GET http://localhost:3000/users/1/bookings` gets a user's bookings with bus numbers.
- `GET http://localhost:3000/buses/1/bookings` gets a bus's bookings with user details.

Create the user and bus first, then use their returned IDs for the booking request:

```json
{"userId":1,"busId":1,"seatNumber":10}
```

Both booking lookup routes return an array of bookings. The user route includes each `bus.busNumber`; the bus route includes each `user.name` and `user.email`.

For POST requests in Postman, choose **Body > raw > JSON**.
