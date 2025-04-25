import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    roomSize: 'Single',
    rent: '',
    studentId: '',
    roomId: '',
  });

  useEffect(() => {
    fetchStudents();
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch('http://localhost:5001/api/students');
    const data = await response.json();
    setStudents(data);
  };

  const fetchRooms = async () => {
    const response = await fetch('http://localhost:5002/api/rooms');
    const data = await response.json();
    setRooms(data);
  };

  const fetchBookings = async () => {
    const response = await fetch('http://localhost:5003/api/bookings');
    const data = await response.json();
    setBookings(data);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5001/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: formData.name }),
    });
    fetchStudents();
    setFormData({ ...formData, name: '' });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5002/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomNumber: formData.roomNumber,
        roomSize: formData.roomSize,
        rent: parseFloat(formData.rent),
        isOccupied: false,
      }),
    });
    fetchRooms();
    setFormData({ ...formData, roomNumber: '', roomSize: 'Single', rent: '' });
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5003/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: formData.studentId,
        roomId: formData.roomId,
      }),
    });
    fetchBookings();
    fetchRooms();
    setFormData({ ...formData, studentId: '', roomId: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hostel Management System</h1>

      {/* Add Student */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Student</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Student Name"
            className="border p-2 rounded"
          />
          <button onClick={handleAddStudent} className="bg-blue-500 text-white p-2 rounded">
            Add
          </button>
        </div>
      </div>

      {/* Add Room */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Room</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.roomNumber}
            onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
            placeholder="Room Number"
            className="border p-2 rounded"
          />
          <select
            value={formData.roomSize}
            onChange={(e) => setFormData({ ...formData, roomSize: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
          </select>
          <input
            type="number"
            value={formData.rent}
            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
            placeholder="Rent (₹)"
            className="border p-2 rounded"
          />
          <button onClick={handleAddRoom} className="bg-blue-500 text-white p-2 rounded">
            Add
          </button>
        </div>
      </div>

      {/* Add Booking */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Booking</h2>
        <div className="flex gap-2">
          <select
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
          <select
            value={formData.roomId}
            onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Room</option>
            {rooms
              .filter((room) => !room.isOccupied)
              .map((room) => (
                <option key={room._id} value={room._id}>
                  {room.roomNumber} ({room.roomSize}, ₹{room.rent})
                </option>
              ))}
          </select>
          <button onClick={handleAddBooking} className="bg-blue-500 text-white p-2 rounded">
            Book
          </button>
        </div>
      </div>

      {/* Display Data */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Students</h2>
          <ul className="border p-2 rounded">
            {students.map((student) => (
              <li key={student._id} className="py-1">
                {student.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Rooms</h2>
          <ul className="border p-2 rounded">
            {rooms.map((room) => (
              <li key={room._id} className="py-1">
                {room.roomNumber} ({room.roomSize}, ₹{room.rent}) -{' '}
                {room.isOccupied ? 'Occupied' : 'Available'}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Bookings</h2>
          <ul className="border p-2 rounded">
            {bookings.map((booking) => (
              <li key={booking._id} className="py-1">
                {students.find((s) => s._id === booking.studentId)?.name} - Room{' '}
                {rooms.find((r) => r._id === booking.roomId)?.roomNumber} (
                ₹{rooms.find((r) => r._id === booking.roomId)?.rent})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;