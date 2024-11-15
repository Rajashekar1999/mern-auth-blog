import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const CenteredContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: "url('https://source.unsplash.com/random/1600x900')",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const CreateBlog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
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
          Create Blogs
        </Typography>
        <form>
          <TextField
            label="Title"
            type="title"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2, mt: 1 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Content"
            type="content"
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
            onClick={handleCreate}
          >
            Create
          </Button>
        </form>
      </Paper>
    </CenteredContainer>
  );
};

export default CreateBlog;
