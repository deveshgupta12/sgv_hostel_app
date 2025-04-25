const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookings_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  roomId: mongoose.Schema.Types.ObjectId,
});
const Booking = mongoose.model('Booking', bookingSchema);

app.get('/api/bookings', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

app.post('/api/bookings', async (req, res) => {
  const booking = new Booking({
    studentId: req.body.studentId,
    roomId: req.body.roomId,
  });
  await booking.save();
  await axios.put(`http://localhost:5002/api/rooms/${req.body.roomId}`, {
    isOccupied: true,
  });
  res.json(booking);
});

app.listen(5003, () => console.log('Booking service running on port 5003'));