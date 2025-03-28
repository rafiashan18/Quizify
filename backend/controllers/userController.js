const User = require("../models/User");
const { cloudinary } = require("../config/cloudinary");
const mongoose = require("mongoose")

// const updateUser = async (req, res) => {
//     try {
//         console.log("hello");
//         console.log(req.body)
//         const userId = req.user.userId;
//         console.log(userId);
//         const user = await User.findById(userId);
//         console.log(user)
//         if (!user) {
//             return res.status(404).json({ message: "User Not Found" })
//         }
//         const response = await User.findByIdAndUpdate(userId, req.body, {
//             new: true,
//             runValidators: true
//         })

//         if (!response) {
//             return res.status(403).json({ message: response })
//         }
//         return res.status(200).json({
//             message: "Updated Successfully",
//             data: `${user}`
//         })
//     }
//     catch (err) {
//         return res.status(500).json({ message: `Internal Server Error ${err}` })
//     }
// }




const updateUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const updateData = req.body;


        delete updateData.password;
        delete updateData.role;

        if (req.file) {
            updateData.profilePicture = req.file.path;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password ');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const userId = req.user.userId;

        // Get current user to find old profile picture
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.profilePicture && user.profilePicture !== "default.jpg" && user.profilePicture.includes("cloudinary")) {
            try {
                const publicIdMatch = user.profilePicture.match(/profile_pictures\/([^/]+)(\.\w+)?$/);
                if (publicIdMatch && publicIdMatch[1]) {
                    await cloudinary.uploader.destroy(`profile_pictures/${publicIdMatch[1]}`);
                }
            } catch (cloudinaryError) {
                console.error("Error deleting old profile picture:", cloudinaryError);
                // Continue with the update even if deletion fails
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: req.file.path },
            { new: true }
        ).select('-password ');

        if (!updatedUser) {
            return res.status(404).json({ message: "Failed to update user" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ message: "Error uploading profile picture", error: error.message });
    }
};

const showUsers = async (req, res) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized for this action" });
        }


        const users = await User.find({ role: "user" })
            .select('-password  ')
            .sort({ createdAt: -1 });
        console.log(users)
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users available" });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error in showUsers:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


const updateUserStatus = async (req, res) => {
    try {
        // Check if the user is authorized (admin only)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized for this action" });
        }

        const { userId } = req.params;
        const { status } = req.body;

        // Validate status
        if (!status || !['active', 'blocked'].includes(status)) {
            return res.status(400).json({ message: "Invalid status provided" });
        }

        // Find and update the user
        const user = await User.findByIdAndUpdate(
            userId,
            { status },
            { new: true }
        ).select('-password  ');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: `User ${status === 'blocked' ? 'blocked' : 'activated'} successfully`,
            user
        });
    } catch (error) {
        console.error("Error in updateUserStatus:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// delete user

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const response = await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "User deleted successfully", user: response });
    }
    catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

const addUser = async (req, res) => {
    try {
        console.log("Received Body:", req.body);
        console.log("Received File:", req.file);

        // Ensure required fields are present
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, email, password"
            });
        }

        let userData = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username || "suff",
            password: req.body.password,
            role: req.body.role || 'user'
        };

        if (req.file) {
            userData.profilePicture = req.file.path;
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "User added successfully",
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role,
                createdAt: savedUser.createdAt
            }
        });

    } catch (error) {
        console.error("Error adding user:", error);

        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
};

const addPurchasedQuiz = async (req, res) => {
    try {
        const { quizId } = req.body; 
        const userId = req.user.userId; 
        console.log(quizId)
        if (!quizId) {
            return res.status(400).json({ message: "Quiz ID is required" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { purchasedQuizzes: quizId } }, 
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Quiz added to purchased list", user });
    } catch (error) {
        console.error("Error updating purchased quizzes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const checkQuizPurchasedStatus = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user.userId;
        console.log(userId, quizId)

        const objectIdQuizId = new mongoose.Types.ObjectId(quizId);
        console.log(objectIdQuizId)
        const data = await User.findOne({
            _id: userId,
            purchasedQuizzes: objectIdQuizId,
        });

        if (data) {
            return res.status(200).json({ isPurchased: true });
        } else {
            return res.status(200).json({ isPurchased: false });
        }
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};



module.exports = {
    updateUser,
    showUsers,
    uploadProfilePicture,
    updateUserStatus,
    deleteUser,
    addUser,
    checkQuizPurchasedStatus,
    addPurchasedQuiz
};
