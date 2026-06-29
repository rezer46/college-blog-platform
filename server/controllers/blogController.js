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
  try {

    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getMyBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find({
      author: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);

    // Check if blog exists
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Update fields
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    const updatedBlog = await blog.save();

    res.json(updatedBlog);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);

    // Check if blog exists
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Delete blog
    await blog.deleteOne();

    res.json({
      message: "Blog deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createBlog,
  getBlogs,
  getMyBlogs,
  updateBlog,
  deleteBlog,
};