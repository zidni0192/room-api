// controllers/clientController.js
const Client = require('../models/clientModel');

async function getAllClients(req, res) {
  try {
    const clients = await Client.findAll();
    res.json({ message: 'Success', data: clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function createClient(req, res) {
  const { name, email, phone, credit } = req.body;
  try {
    const newClient = await Client.create({ name, email, phone, credit });
    res.status(201).json({ message: 'Client created successfully', data: newClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateClient(req, res) {
  const { id } = req.params;
  const { name, email, phone, credit } = req.body;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    client.name = name;
    client.email = email;
    client.phone = phone;
    client.credit = credit;
    await client.save();
    res.json({ message: 'Client updated successfully', data: client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteClient(req, res) {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    await client.destroy();
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getClientById(req, res) {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json({ message: 'Success', data: client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getAllClients, createClient, updateClient, deleteClient, getClientById };
