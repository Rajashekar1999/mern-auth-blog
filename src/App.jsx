import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BlogsList from "./pages/BlogsList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateBlog from "./pages/CreateBlog";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="all-blogs"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <BlogsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-blog"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
