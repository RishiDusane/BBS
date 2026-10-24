INSERT INTO users (name, email)
SELECT 'Rishi Dusane', 'rishi@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'rishi@gmail.com');

INSERT INTO users (name, email)
SELECT 'Rahul Sharma', 'rahul@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'rahul@gmail.com');

INSERT INTO users (name, email)
SELECT 'Priya Patil', 'priya@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'priya@gmail.com');

INSERT INTO users (name, email)
SELECT 'Amit Kulkarni', 'amit@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'amit@gmail.com');

INSERT INTO users (name, email)
SELECT 'Sneha Joshi', 'sneha@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'sneha@gmail.com');

INSERT IGNORE INTO buses (busID, busNumber, totalSeats, availableSeats) VALUES
  (1, 'MH12AB1234', 40, 35),
  (2, 'MH14CD5678', 50, 42),
  (3, 'MH15EF9012', 45, 30),
  (4, 'MH16GH3456', 40, 20),
  (5, 'MH17IJ7890', 55, 50);

INSERT INTO bookings (userId, busId, seatNumber)
SELECT users.id, buses.busID, 5
FROM users
JOIN buses ON buses.busID = 1
WHERE users.email = 'rishi@gmail.com'
  AND NOT EXISTS (
    SELECT 1
    FROM bookings
    WHERE bookings.userId = users.id
      AND bookings.busId = buses.busID
      AND bookings.seatNumber = 5
  );

INSERT IGNORE INTO payments (PaymentID, paymentStatus) VALUES
  (1, 'SUCCESS'),
  (2, 'PENDING'),
  (3, 'FAILED'),
  (4, 'SUCCESS'),
  (5, 'SUCCESS');
