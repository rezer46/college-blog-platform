import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Latest Blogs
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          <div className="grid gap-6">

            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h2 className="text-2xl font-semibold">
                  {blog.title}
                </h2>

                <div
  className="mt-3 prose max-w-none"
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>

                <p className="text-sm text-gray-500 mt-4">
                  Author: {blog.author?.name}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default HomePage;