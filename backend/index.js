import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());  // Allow all origins (for debugging purposes)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /api/user for user routes.');
});
app.use('/api/user', userRoutes);

const dbURI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error ('Error connecting to MongoDb:', error.message);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});