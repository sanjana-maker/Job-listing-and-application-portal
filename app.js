import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot';

const App = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/jobs')
            .then((res) => setJobs(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p>Location: {job.location} | Salary: {job.salary}</p>
                        <p>Contact: {job.contact_email}</p>
                    </li>
                ))}
            </ul>

            <Chatbot />
        </div>
    );
};

export default App;
