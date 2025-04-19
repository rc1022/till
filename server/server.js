require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url} from origin: ${req.headers.origin}`);
    next();
  });

console.log('Backend: Applying CORS middleware...');
app.use(cors({
    origin: '*', // Explicitly allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
console.log('Backend: CORS middleware applied.');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

pool.getConnection()
.then( connection => {
    console.log('Connected to the database.');
    connection.release();
})
.catch( err => {
    console.err('Error connecting to the database:', err.stack);
    process.exit(1);
})

const tillRoutes = require('./routes/till');
console.log('Backend: Applying /api/till routes...');
app.use('/api/till', tillRoutes);
console.log('Backend: /api/till routes applied.');

app.get('/', (req, res) => {
    res.send('Till Backend API');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
