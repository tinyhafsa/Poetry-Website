// import
import mongoose from "mongoose"; // interact with mongodb

// creates new schema to define document structure in users collection in mongodb
const userSchema = new mongoose.Schema ({
    // name field
    name: {
        type: String,
        required: true
    },
    // email field
    email: {
        type: String,
        required: true,
        unique: true
    },
    // password field
    password: {
        type: String,
        required: true
    },
});

// converts schema into model and exports it
export default mongoose.model("User", userSchema);