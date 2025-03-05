const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'adced65fdeaf4dedcde26f17'; // Replace with your API key
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

app.get('/convert', async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'Please provide from, to, and amount query parameters.' });
  }

  try {
    const response = await axios.get(`${BASE_URL}${from}`);
    const rate = response.data.rates[to];

    if (!rate) {
      return res.status(400).json({ error: `Invalid target currency: ${to}` });
    }

    const convertedAmount = (amount * rate).toFixed(2);
    res.json({ from, to, amount, convertedAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exchange rates.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
