const User = require('./models/User');

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "123456789@Admin";

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log("\n=== Admin Already Exists ===");
      // console.log("Admin ID:", existingAdmin._id);
      // console.log("Admin email:", existingAdmin.email);
      // console.log("Admin username:", existingAdmin.username);
      return existingAdmin;
    }

    // Create admin user with plain password
    const admin = new User({
      name: "Admin User",
      email: ADMIN_EMAIL,
      username: `admin${Math.floor(1000 + Math.random() * 9000)}`,
      password: ADMIN_PASSWORD,  // Plain password - model will hash it
      role: "admin",
      isVerified: true,  // Set admin as verified
      bio: "System Administrator",
    });

    const savedAdmin = await admin.save();
    // console.log("\n=== Admin Created ===");
    // console.log("Admin ID:", savedAdmin._id);
    // console.log("Admin email:", savedAdmin.email);
    // console.log("Admin username:", savedAdmin.username);

    const passwordVerification = await savedAdmin.comparePassword(ADMIN_PASSWORD);
    
    if (passwordVerification) {
      // console.log(" Admin seeded successfully!");
      // console.log("Login credentials:");
      // console.log("Email:", ADMIN_EMAIL);
      // console.log("Password:", ADMIN_PASSWORD);
      return savedAdmin;
    } else {
      throw new Error("Password verification failed - please check the User model configuration");
    }

  } catch (error) {
    console.error("Error seeding admin:", error.message);
    throw error;
  }
};

module.exports = seedAdmin;