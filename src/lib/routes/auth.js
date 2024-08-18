// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../lib/models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // 对密码进行哈希处理
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建并保存用户
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
    
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;
