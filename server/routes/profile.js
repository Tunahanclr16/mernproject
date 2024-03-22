const express = require("express");
const router = express.Router();

// Örnek bir kullanıcı profili
const userProfile = {
  username: "exampleUser",
  avatar: "https://example.com/avatar.jpg",
};

// GET endpoint'i kullanıcı profili bilgilerini döndürür
router.get("/", async (req, res) => {
  try {
    // Kullanıcı profili bilgilerini döndür
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
