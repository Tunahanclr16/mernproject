const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User } = require("../database/schema/user");
// register.js
const register = async (req, res) => {
  const { username, email, password, avatar } = req.body;
  const userTable = await User.findOne({ email: email });
  if (userTable) return res.json({ message: "Bu kullanıcı zaten var" });
  if (password.length < 6)
    return res.json({ message: "sifre en az 6 karakter olmalıdır" });
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User({
    username: username,
    email: email,
    password: passwordHash,
    avatar: avatar,
  });
  const createUser = await newUser.save();
  if (!createUser)
    return res.json({
      status: "OK",
    });
  res.json({
    status: "OK",
    username: newUser.username, // Kullanıcı adı
    avatar: newUser.avatar // Avatar
  });
};

module.exports = {
  register,
};