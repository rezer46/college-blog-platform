import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import MyBlogsPage from "./pages/MyBlogsPage";
import ProfilePage from "./pages/ProfilePage";
import EditBlogPage from "./pages/EditBlogPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/myblogs" element={<MyBlogsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-blog/:id" element={<EditBlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;