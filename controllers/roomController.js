// controllers/roomController.js
const Room = require('../models/roomModel');
const Client = require('../models/clientModel');
const RoomUsage = require('../models/roomUsageModel');

async function getAllRooms(req, res) {
    try {
        const rooms = await Room.findAll();
        res.json({ message: 'Success', data: rooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createRoom(req, res) {
    const { roomName, costPerHour } = req.body;
    try {
        const newRoom = await Room.create({ roomName, costPerHour });
        res.status(201).json({ message: 'Client created successfully', data: newRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateRoom(req, res) {
    const { id } = req.params;
    const { roomName, costPerHour } = req.body;
    try {
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        room.roomName = roomName;
        room.costPerHour = costPerHour;
        await room.save();
        res.json({ message: 'Client updated successfully', data: room });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteRoom(req, res) {
    const { id } = req.params;
    try {
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        await room.destroy();
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function getRoomById(req, res) {
    const { id } = req.params;
    try {
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function bookRoom(req, res) {
    const { clientId, roomId, startTime, endTime, bookingDate, quotaUsed } = req.body;
    try {
        // Cek apakah ada pemesanan ruangan pada waktu yang bersinggungan
        // const existingBooking = await RoomUsage.findOne({
        //     where: {
        //         roomId,
        //         bookingDate
        //     }
        // });

        // if (existingBooking) {
        //     return res.status(400).json({ message: 'Room already booked for the given time and date' });
        // }

        // Tambahkan data pemesanan ke database
        const newBooking = await RoomUsage.create({ clientId, roomId, startTime, endTime, bookingDate, quotaUsed });
        res.status(201).json({ message: 'Room booked successfully', data: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function roomUsages(req, res) {
    try {
        // Dapatkan semua penggunaan ruangan dari tabel RoomUsage
        const roomUsages = await RoomUsage.findAll({
            include: [
                { model: Client, as: 'client' },
                { model: Room, as: 'room' }
            ]
        });

        // Kirim respons dengan data penggunaan ruangan
        return res.status(200).json({ message: 'Success', data: roomUsages });
    } catch (error) {
        console.error('Error fetching room usages:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAllRooms, createRoom, updateRoom, deleteRoom, getRoomById, bookRoom, roomUsages };