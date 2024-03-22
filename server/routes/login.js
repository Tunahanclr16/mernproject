const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User } = require("../database/schema/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı" });
    }

    // Kullanıcının şifresini kontrol et
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Geçersiz şifre" });
    }

    // Kullanıcı kimlik doğrulaması başarılı, JWT oluştur

    res.json({ 
      message: "Giriş başarılı",
      username: user.username, // Kullanıcı adı
      avatar: user.avatar // Avatar
    });
  } catch (error) {
    console.error("Giriş işlemi sırasında bir hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = {
  login,
};
