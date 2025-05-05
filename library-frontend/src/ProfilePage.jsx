import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get user info from localStorage

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/sign-in");
  };

   const [books, setBooks] = useState([]);
  
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/v1/book");
          const data = await response.json();
          if (response.ok) {
            setBooks(data.message.slice(0, 10));
          } else {
            console.error("Failed to fetch books:", data.error);
          }
        } catch (err) {
          console.error("Error fetching books:", err);
        }
      };
  
      fetchBooks();
    }, []);

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
