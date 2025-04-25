# MongoDB Setup

Instructions for setting up MongoDB for the hostel management app.

1. Install MongoDB if not already installed.
2. Start MongoDB server: `mongod`
3. The app uses three databases:
   - `mongodb://localhost:27017/students_db`
   - `mongodb://localhost:27017/rooms_db`
   - `mongodb://localhost:27017/bookings_db`
4. No additional schema setup needed; each microservice creates its collections automatically.