import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { Link } from "react-router-dom";

function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await api.get("/blogs/myblogs", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setBlogs(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await api.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Blogs
        </h1>

        {blogs.length === 0 ? (
          <p>No blogs created yet.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-lg p-6 mb-4"
            >
              <h2 className="text-2xl font-semibold">
                {blog.title}
              </h2>

              <div
  className="mt-3 prose max-w-none"
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>
<div className="flex gap-3 mt-4">

  <Link
    to={`/edit-blog/${blog._id}`}
    className="bg-yellow-500 text-white px-4 py-2 rounded"
  >
    Edit
  </Link>

  <button
    onClick={() => handleDelete(blog._id)}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>

</div>
            
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default MyBlogsPage;