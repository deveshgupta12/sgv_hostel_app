const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/rooms_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => console.error('MongoDB connection error:', err));

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  roomSize: String,
  rent: Number,
  isOccupied: Boolean,
});
const Room = mongoose.model('Room', roomSchema);

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    const room = new Room({
      roomNumber: req.body.roomNumber,
      roomSize: req.body.roomSize,
      rent: req.body.rent,
      isOccupied: false,
    });
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add room' });
  }
});

app.put('/api/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isOccupied: req.body.isOccupied },
      { new: true }
    );
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update room' });
  }
});

app.listen(5002, () => console.log('Room service running on port 5002'));