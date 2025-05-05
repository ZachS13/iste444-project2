import * as React from "react";
import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Outlet, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";


export default function ViewBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [allBookInfo, setAllBookInfo] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/book");
        const data = await response.json();
        if (response.ok) {
          setAllBookInfo(data.message);
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

  async function removeBook(){

  }


  async function handleRemoveBook(book){
    //WARNING: UNTESTED FOR MULTIPLE BOOKS THAT HAVE THE SAME TITLE
    console.log(book);
    //console.log(allBookInfo);

    try {

    //   const dataSent = {
    //     method: 'DELETE',
    //     url: `http://localhost:3000/api/v1/book/${bookId}`
    //   }
    //   const response = await fetch(`http://localhost:3000/api/v1/book/${bookId}`, dataSent).then(
    //     console.log("book deletion sent"));
    //     console.log(response.ok);
    // //  const data = await response.json();
    //   if (response.ok) {
    //     // setBooks(data.message);
    //     console.log("book deleted");
    //   } 
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
      {/* left sidebar */}
      <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Button variant="outlined" sx={{ py: 2 }} onClick={() => navigate('/add-book')}>Add Book</Button>
        <TextField label="Enter book title to checkout book" variant="outlined" sx={{ input: { py: 2 } }} />
        <Button variant="outlined" color="success" sx={{ py: 2 }}>SUBMIT</Button>
      </Box>

      {/* book list */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, border: 1, borderColor: 'grey.400', borderRadius: 1 }}>
        <List sx={{ width: '100%', maxWidth: 600 }}>
          {allBookInfo.map((book, idx) => (
            <Box key={idx} sx={{ border: 1, borderColor: 'grey.400', borderRadius: 1, mb: 2, p: 1 }}>
              <ListItem disablePadding
              
              secondaryAction={
               <button onClick={ () => { handleRemoveBook(book) }}> Delete</button>
              }>
                
                <ListItemText
                  primary={book.title}
                  secondary={`${book.author} | ${book.published_year}`}

                />
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}