import * as React from "react";
import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function MyBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [checkoutTitle, setCheckoutTitle] = useState("");

  // Parse user only once
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.userId) return;
      try {
        const response = await fetch(`http://172.16.1.68:3000/api/v1/checkout/all/${user.userId}`);
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
  }, []); // Only run once on component mount

  const handleCheckout = async () => {
    if (!user || !user.userId) {
      alert("Please log in first.");
      return;
    }

    const matchingBook = books.find(
      (book) => book.title.toLowerCase() === checkoutTitle.toLowerCase()
    );

    if (!matchingBook) {
      alert("Book not found!");
      return;
    }

    try {
      const res = await fetch(`http://172.16.1.68:3000/api/v1/checkout/${matchingBook.book_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Book checked out!");
      } else {
        alert(data.error || "Failed to check out book.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
      <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Button variant="outlined" sx={{ py: 2 }} onClick={() => navigate('/add-book')}>Add Book</Button>
        <TextField
          label="Enter book title to checkout book"
          variant="outlined"
          sx={{ input: { py: 2 } }}
          value={checkoutTitle}
          onChange={(e) => setCheckoutTitle(e.target.value)}
        />
        <Button variant="outlined" color="success" sx={{ py: 2 }} onClick={handleCheckout}>SUBMIT</Button>
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, border: 1, borderColor: 'grey.400', borderRadius: 1 }}>
        <List sx={{ width: '100%', maxWidth: 600 }}>
          {books.map((book, idx) => (
            <Box key={idx} sx={{ border: 1, borderColor: 'grey.400', borderRadius: 1, mb: 2, p: 1 }}>
              <ListItem disablePadding>
                <ListItemText
                  primary={book.title}
                  secondary={`Checked out: ${book.checkout_date} | Return by: ${book.return_date || "N/A"}`}
                />
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}
