// imports
import express from 'express'; // create router and handle requests
import User from '../models/userModel.js'; // user model

// creates new router object for user sign up and log in
const router = express.Router();

// create a new user // sign up
router.post('/', async (req, res) => {
    // extracts input field from incoming request
    const {name, email, password} = req.body;

    try {
        // cerates new instance of user model with data
        const newUser = new User({name, email, password});
        // saves new user into database
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error during user creation:", error); // log the full error to server console
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});

// user log in route
router.post('/login', async (req, res) => {
    // extracts email and password from request body
    const { email, password } = req.body;

    try {
        // find user by email
        const user = await User.findOne({ email });

        // if user is not found, error is logged
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // if password does not match, error is logged
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.json({ user }); // successful login

    } catch (error) { // error handling
        console.error('Error during login:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;