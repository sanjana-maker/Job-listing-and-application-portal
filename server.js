const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // replace with your MySQL password
    database: 'job_portal'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// Middleware
app.use(bodyParser.json());

// Routes
// Admin - Add a new job listing
app.post('/api/jobs', (req, res) => {
    const { title, description, location, salary, contact_email } = req.body;
    const query = `INSERT INTO jobs (title, description, location, salary, contact_email) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [title, description, location, salary, contact_email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Job added successfully' });
    });
});

// Admin - List all job listings
app.get('/api/jobs', (req, res) => {
    db.query('SELECT * FROM jobs', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Candidate - Apply for a job
app.post('/api/applications', (req, res) => {
    const { candidate_name, contact, job_id } = req.body;
    const query = `INSERT INTO applications (job_id, candidate_name, contact) VALUES (?, ?, ?)`;
    db.query(query, [job_id, candidate_name, contact], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Application submitted successfully' });
    });
});

// ChatGPT - Query ChatGPT API
app.post('/api/chatgpt', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo",
            prompt: message,
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`  // Replace with your OpenAI API key
            }
        });

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error with ChatGPT API:', error);
        res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
