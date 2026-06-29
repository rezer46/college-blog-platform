const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check required fields
    if (!title || !content) {
      return res.status(400).json({
        message: "Please provide title and content",
      });
    }

    // Create blog
    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(blog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
  res.json({
    message: "Get All Blogs",
  });
};

const getMyBlogs = async (req, res) => {
  res.json({
    message: "My Blogs",
  });
};

const updateBlog = async (req, res) => {
  res.json({
    message: "Update Blog",
  });
};

const deleteBlog = async (req, res) => {
  res.json({
    message: "Delete Blog",
  });
};

module.exports = {
  createBlog,
  getBlogs,
  getMyBlogs,
  updateBlog,
  deleteBlog,
};