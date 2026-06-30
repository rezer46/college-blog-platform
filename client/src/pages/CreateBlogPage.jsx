import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import RichTextEditor from "../components/RichTextEditor";

function CreateBlogPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await api.post(
        "/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Blog created successfully");

      navigate("/myblogs");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to create blog"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Create Blog
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
<RichTextEditor
  content={formData.content}
  onChange={(value) =>
    setFormData({
      ...formData,
      content: value,
    })
  }
/>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Publish Blog
          </button>

        </form>

      </div>
    </>
  );
}

export default CreateBlogPage;