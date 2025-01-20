// imports
import express from 'express'; // create and configure server
import mongoose from 'mongoose'; // connect and interact with mongodb
import dotenv from 'dotenv'; // loads variables from .env file
import cors from 'cors'; // allow or restrict resources requested from APIs
import userRoutes from './routes/userRoutes.js';

dotenv.config(); // allows usage of variables in .env file

const app = express(); // initializes express app
const port = process.env.PORT; // reads server Port from variable

app.use(cors());  // allows API to be accessed from different domains
app.use(express.json()); // parses incoming json request

// defines GET route
app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /api/user for user routes.');
});

app.use('/api/user', userRoutes); // handles requests

const dbURI = process.env.DB_URI; // reads mongodb connection string from varaible

// connect to mongo db using mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error ('Error connecting to MongoDb:', error.message);
    }
};

connectDB(); // function called

// starts express app and listens for incoming requests
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});