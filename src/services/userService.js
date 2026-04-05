// src/services/userService.js
const axios = require('axios');

async function getUser(id) {
  const response = await axios.get(`https://api.com/users/${id}`);
  return response.data;
}

module.exports = { getUser };