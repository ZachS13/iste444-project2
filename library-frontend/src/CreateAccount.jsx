import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const res = await fetch("http://172.16.1.68/api/v1/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) navigate("/sign-in");
    else alert(data.error);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Create Account</Typography>
      <TextField label="Username" fullWidth sx={{ my: 1 }} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth sx={{ my: 1 }} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleCreate}>Create</Button>
    </Box>
  );
}