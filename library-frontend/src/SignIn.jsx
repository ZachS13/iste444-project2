import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const res = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.message)); // store user info
      navigate("/profile");
    } else {
      alert(data.error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Sign In</Typography>
      <TextField label="Username" fullWidth sx={{ my: 1 }} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth sx={{ my: 1 }} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleSignIn}>Sign In</Button>
    </Box>
  );
}
