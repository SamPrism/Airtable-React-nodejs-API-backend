require('dotenv').config();
const express = require('express');
const Airtable = require('airtable');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Airtable base
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

// POST route to receive form submissions
app.post('/api/form', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const records = await base('tblXynZOKkK4jX4zn').create([
      {
        fields: {
          Name: name,
          Email: email,
          Message: message,
        },
      },
    ]);
    res.status(200).json({ success: true, id: records[0].id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
