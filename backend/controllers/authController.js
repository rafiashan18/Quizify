
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        console.log("Inside User SignUp", req.body);
        const { name, email, password, googleId } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already exists" });
        }

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const username = name.toLowerCase().replace(/\s+/g, "") + randomNum;

        const userData = { name, email, password, username };
        if (googleId) userData.googleId = googleId;

        const user = new User(userData);
        const newUser = await user.save();

        if (!newUser) {
            return res.status(400).json({ message: "User not registered" });
        }

        res.status(201).json({
            success: true,
            message: "User registered Successfully"
        });
    } catch (err) {
        res.status(500).json({ message: `Registration failed. ${err}` });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("\n=== Login Request ===");
        console.log("Email:", email);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // console.log(user);

        const isMatched = await bcrypt.compare(password, user.password);
        const isMatchedTrimmed = await bcrypt.compare(password.trim(), user.password);

        if (!isMatched && !isMatchedTrimmed) {
            return res.status(403).json({
                success: false,
                message: "Incorrect password"
            });
        }
        if(user.status == 'blocked'){
          return  res.status(403).json({message: "Your account is blocked"})
        }

        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_SECRET,
            { expiresIn: "1d" }
        );


        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage:user.profilePicture,
            bio:user.bio,
        };
        console.log(userData)
        return res.status(200).json({
            success: true,
            accessToken,
            user: userData
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
};

const logout = async (req, res) => {
    try {

        res.json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (err) {
        res.status(500).json({ message: `Server Error ${err}` });
    }
};

// Backend route handler - add more logging
const getMe = async (req, res) => {
    try {
        console.log(req.user.userId)
        const userId = req.user.userId;
        console.log("Looking up user with ID:", userId);


        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found in database");
            return res.status(404).json({ message: "User not found" });
        }
        const userData = {
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            bio: user.bio,
            profileImage:user.profilePicture
        }
        console.log("User found:", user._id);
        res.json(userData);
    } catch (err) {
        console.error("Error in getMe:", err);
        res.status(500).json({ message: `Server Error ${err}` });
    }
};

module.exports = { signup, login, logout, getMe };