const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getMyBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

// Public Route
router.get("/", getBlogs);

// Protected Routes
router.post("/", protect, createBlog);
router.get("/myblogs", protect, getMyBlogs);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;