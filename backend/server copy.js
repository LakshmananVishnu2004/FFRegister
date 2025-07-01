const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
}));

// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    //checks if the user deetails is already exists
const existingUser = await User.findOne({$or : [{email},{ mobile }]});
if (existingUser){
  return res.status(409).json({ message: 'user details already existed with this email or mobile number.'})
}

    if (!name || !email || !mobile) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = new User({ name, email, mobile });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // console.log("📦 Incoming request body:", req.body);

});
