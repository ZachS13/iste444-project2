import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function AddBook(){
    const location = useLocation();
    const navigate = useNavigate();
    const editingBook = location.state?.book || null;

    const [book, setBook] = useState({
      title: editingBook?.title || "",
      author: editingBook?.author || "",
      genre: editingBook?.genre || "",
      publishedYear: editingBook?.published_year || "",
    });
  
    //change book's title to whatever is in the text field
    function handleTitleChange(e){
      setBook({
        ...book,
        title: e.target.value
      });

    }

     //change book's author to whatever is in the text field
    function handleAuthorChange(e){
      setBook({
        ...book,
        author: e.target.value
      });
    }

     //change book's genre to whatever is in the text field
    function handleGenreChange(e){
      setBook({
        ...book,
        genre: e.target.value
      });
    }

     //change book's year to whatever is in the text field
    function handleYearChange(e){
      setBook({
        ...book,
        publishedYear: e.target.value
      });

    }

    //send book's info to database to make a new entry
      async function createBook(){
        
          console.log(book);
          try {
            const dataSent = {
              method: 'POST',
              url: 'http://172.16.1.68:3000/api/v1/book',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title: book.title,
                author: book.author,
                genre: book.genre,
                publishedYear: book.publishedYear
              }) 
            }
            const response = await fetch(`http://172.16.1.68:3000/api/v1/book`, dataSent).then(
              console.log("book done"));
              console.log(response.ok);
          //  const data = await response.json();
            if (response.ok) {
              // setBooks(data.message);
              console.log("book posted");
            } 
          } catch (err) {
            console.error("Error fetching books:", err);
          }
          }

          async function saveBook() {
            try {
              const isEditing = !!editingBook;
              const url = isEditing
                ? `http://172.16.1.68:3000/api/v1/book/${editingBook.book_id}`
                : `http://172.16.1.68:3000/api/v1/book`;
              const method = isEditing ? "PUT" : "POST";
        
              const res = await fetch(url, {
                method,
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  title: book.title,
                  author: book.author,
                  genre: book.genre,
                  publishedYear: book.publishedYear
                })
              });
        
              const data = await res.json();
              if (res.ok) {
                alert(isEditing ? "Book updated!" : "Book added!");
                navigate("/");
              } else {
                alert(data.error || "There was an error saving the book.");
              }
            } catch (err) {
              console.error("Error saving book:", err);
              alert("Something went wrong.");
            }
          }
     
          return (
            <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
              <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField label="Book title" variant="outlined" sx={{ input: { py: 2 } }} value={book.title} onChange={handleTitleChange} />
                <TextField label="Author" variant="outlined" sx={{ input: { py: 2 } }} value={book.author} onChange={handleAuthorChange} />
                <TextField label="Year published" variant="outlined" sx={{ input: { py: 2 } }} value={book.publishedYear} onChange={handleYearChange} />
                <TextField label="Genre(s)" variant="outlined" sx={{ input: { py: 2 } }} value={book.genre} onChange={handleGenreChange} />
                <Button variant="outlined" color="success" sx={{ py: 2 }} onClick={saveBook}>
                  {editingBook ? "Update Book" : "Add Book"}
                </Button>
              </Box>
            </Box>
          );
        }