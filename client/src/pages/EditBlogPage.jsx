import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import RichTextEditor from "../components/RichTextEditor";

function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get("/blogs");

        const blog = res.data.find((b) => b._id === id);

        if (blog) {
          setFormData({
            title: blog.title,
            content: blog.content,
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

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

      await api.put(
        `/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Blog updated successfully");

      navigate("/myblogs");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
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
            className="bg-yellow-500 text-white px-6 py-3 rounded"
          >
            Update Blog
          </button>

        </form>

      </div>
    </>
  );
}

export default EditBlogPage;