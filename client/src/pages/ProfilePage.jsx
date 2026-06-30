import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">

          <p className="mb-4">
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

        </div>
      </div>
    </>
  );
}

export default ProfilePage;