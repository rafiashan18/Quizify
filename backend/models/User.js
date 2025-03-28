const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        status: { type: String, enum: ["active", "blocked"], default: "active" },
        profilePicture: { type: String, default: "https://res.cloudinary.com/dab8gj2ho/image/upload/v1742716908/profile_gft2nf.png" },
        isVerified: { type: Boolean, default: false },
        googleId: { type: String, default: null, unique: false },
        bio: { type: String, default: null },
       purchasedQuizzes:[{type:mongoose.Schema.Types.ObjectId,required:true,ref: "Quiz"} ]
      },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    try {
        const user = this;
        if (!user.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;