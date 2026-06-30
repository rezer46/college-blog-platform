import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold">
          College Blog
        </Link>

        <div className="space-x-4">

          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/create-blog">
                Create Blog
              </Link>

              <Link to="/myblogs">
                My Blogs
              </Link>

              <Link to="/profile">
                Profile
              </Link>

              <button
                onClick={logout}
                className="cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;