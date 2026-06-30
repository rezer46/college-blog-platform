import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const res = await api.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Register
          </button>

        </form>

      </div>
    </div>
  );
  <p className="text-center mt-4">
  Already have an account?{" "}
  <Link to="/login" className="text-blue-600">
    Login
  </Link>
</p>
}

export default RegisterPage;