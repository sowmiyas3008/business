const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database');
});

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  verificationToken: String,
  isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sowmiyasbtechcse@gmail.com', // Replace with your email
    pass: 'elxm weuj gues fzgb'     // Replace with your Gmail app password
  }
});

// Sign-up endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword, verificationToken });
    await newUser.save();

    // Send verification email
    const mailOptions = {
      from: 'sowmiyasbtechcse@gmail.com',
      to: email,  //receiptants email address
      subject: 'Email Verification',
      text: `Please verify your email by clicking on the following link: http://localhost:3000/verify-email?token=${verificationToken}`
    };
    
    await transporter.sendMail(mailOptions);
    res.status(200).send('Verification email sent');
  } catch (error) {
    res.status(500).send('Error processing request');
  }
});

// Email verification endpoint
app.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  
  try {
    // Find the user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).send('Invalid token');
    }
    
    // Update user status to verified
    user.isVerified = true;
    user.verificationToken = undefined; // Remove token
    await user.save();
    
    res.redirect('http://localhost:3000/verification-success'); // Redirect to success page
  } catch (error) {
    res.status(500).send('Error verifying email');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
