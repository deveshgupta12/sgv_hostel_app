# SGV Hostel App

A 3-tier microservices-based hostel management system with a React frontend, Node.js/Express backend, and MongoDB database. Supports custom room sizes (Single, Double, Triple) and Indian Rupees (INR) for rent.

## Project Structure
- `frontend/`: React app for the user interface.
- `student-service/`: Microservice for student management.
- `room-service/`: Microservice for room management.
- `booking-service/`: Microservice for booking management.
- `docs/`: MongoDB setup instructions.

## Setup Instructions
1. **Prerequisites**:
   - Install Node.js (v16+), MongoDB, and Git.
   - Start MongoDB: `mongod`.

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/deveshgupta12/sgv_hostel_app.git
   cd sgv_hostel_app
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Microservices Setup**:
   For each service (`student-service`, `room-service`, `booking-service`):
   ```bash
   cd <service-folder>
   npm install
   npm start
   ```
   - Student service: `http://localhost:5001`
   - Room service: `http://localhost:5002`
   - Booking service: `http://localhost:5003`

5. **MongoDB**:
   - Ensure MongoDB is running on `localhost:27017`.
   - Databases: `students_db`, `rooms_db`, `bookings_db` (created automatically).

## Features
- Add students and rooms (with custom sizes and INR rent).
- Create bookings for available rooms.
- View students, rooms, and bookings.

## Future Enhancements
- Add authentication, validation, and error handling.
- Implement booking cancellation and room availability filters.