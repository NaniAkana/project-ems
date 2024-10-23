import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
    try {
        console.log("Connecting to database...");
        connectToDatabase();

        // Check if the user already exists
        const existingUser = await User.findOne({ email: "naniakana567@gmail.com" });
        if (existingUser) {
            console.log("User already exists");
            return;
        }

        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "Admin",
            email: "naniakana567@gmail.com",
            password: hashPassword,
            role: "admin"
        });
        console.log("User object created:", newUser);
        await newUser.save();
        console.log("User saved successfully");
    } catch (error) {
        console.log("Error during user registration:", error);
    }
};

userRegister();

