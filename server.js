const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ConnectDB = require('./config/db');


// Loads env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect Database
ConnectDB();

// Body parsing
app.use(express.json());

// Enable Cors
app.use(cors());

// Routes
app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is runnning in ${process.env.NODE_ENV} mode on port ${PORT}`);
});