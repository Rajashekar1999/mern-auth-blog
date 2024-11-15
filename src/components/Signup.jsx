import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
const CenteredContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: "url('https://source.unsplash.com/random/1600x900')",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.user.role === "admin") {
        navigate("/create-blog");
      } else if (userInfo.user.role === "user") {
        navigate("/all-blogs");
      }
    }
  }, [navigate, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      toast.success("Signup success...");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.error(err);
    }
  };

  return (
    <CenteredContainer>
      <Paper
        elevation={6}
        className="p-8 max-w-sm w-full rounded-md shadow-lg bg-opacity-90 bg-white"
      >
        <Typography
          variant="h4"
          className="text-center mb-12 font-semibold text-gray-800"
        >
          Signup
        </Typography>
        <form>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2, mt: 1 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 1 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className="py-2 rounded-md text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleRegister}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </Button>
        </form>
      </Paper>
    </CenteredContainer>
  );
};

export default Signup;
