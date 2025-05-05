import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get user info from localStorage

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/sign-in");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Ritchie Library</Typography>
        <Button variant="outlined" onClick={handleLogout}>Logout</Button>
      </Box>

      <Typography variant="h5" sx={{ mt: 2 }}>
        Welcome, {user?.username || "Guest"}
      </Typography>

      <Typography sx={{ mt: 2 }}>You have (number) books checked out.</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>Checked Out Books:</Typography>
      <List>
        <ListItem>
          <ListItemText primary="(Book Title)" secondary="Checked out: (date) | Return by: (date)" />
        </ListItem>
        {/* Add more books here dynamically if desired */}
      </List>
    </Box>
  );
}
