const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { updateUserProfile } = require("../controllers/authController");

// Get Logged In User Profile
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Update Profile
router.put("/profile", protect, updateUserProfile);

module.exports = router;