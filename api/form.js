// api/form.js
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  base('FormResponses').create(
    [{ fields: { Name: name, Email: email, Message: message } }],
    (err, records) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Airtable error' });
      }
      res.status(201).json({ id: records[0].id });
    }
  );
}
