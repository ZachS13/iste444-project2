import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, List, ListItem, ListItemText} from "@mui/material";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user"))); // Get user info from localStorage
  const [books, setBooks] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/sign-in");
  };
  
  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.userId) return;
      try {
        const response = await fetch(
          `http://172.16.1.68/api/v1/checkout/all/${user.userId}`
        );
        const data = await response.json();
        if (response.ok) {
          setBooks(data.message);
        } else {
          console.error("Failed to fetch books:", data.error);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, [user]);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ mt: 2 }}>
        Welcome, {user?.username || "Guest"}
      </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Typography sx={{ mt: 2 }}>
        You have {books.length} book{books.length !== 1 ? "s" : ""} checked out.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Checked Out Books:
      </Typography>
      <List>
        {books.map((book, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={book.title}
              secondary={`Checked out: ${book.checkout_date} | Return by: ${book.return_date || "N/A"}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}