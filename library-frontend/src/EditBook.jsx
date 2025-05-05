import * as React from "react";
import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Outlet, useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Typography, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function EditBook(){
    const navigate = useNavigate();
     const [title, setTitle] = useState([]);
     const [author, setAuthor] = useState([]);
     const [genre, setGenre] = useState([]);
     const [ yearPublished, setYear] = useState([]);
    const [bookInfo, setBookInfo] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedBook, setSelectedBook] = useState('');

    const handleChange = (event) => {
        setSelectedBook(event.target.value);
        setBook(selectedBook);
        console.log(selectedBook);
      };
 

  //GET data for all books currently in database
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://172.16.1.68:3000/api/v1/book");
        const data = await response.json();
        if (response.ok) {
          setBookInfo(data.message);
        //   setBooks(data.message.slice(0, 10));
        } else {
          console.error("Failed to fetch books:", data.error);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

     //Make empty book entity with mostly empty values
     const [book, setBook] = useState({
      title: "",
      author: "",
      genre: "",
      yearPublished: 1900,
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
        yearPublished: e.target.value
      });

    }

    //send book's info to database to make a new entry
    async function editBook(){
        const bookId = selectedBook.book_id;
          console.log(book);
          console.log(selectedBook);
          try {
            const dataSent = {
                method: 'PUT',
                url: `http://172.16.1.68:3000/api/v1/book/${bookId}`,
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    title: selectedBook.title,
                    author: selectedBook.author,
                    genre: selectedBook.genre,
                    publishedYear: selectedBook.yearPublished
                }) 
            }
            const response = await fetch(`http://172.16.1.68:3000/api/v1/book/${bookId}`, dataSent).then(
              console.log("book done"));
              console.log(response.ok);
              console.log(response.body);
                 //  const data = await response.json();
            if (response.ok) {
              // setBooks(data.message);
              console.log("book posted");
            } 
          } catch (err) {
            console.error("Error fetching books:", err);
          }
    }
     
      return (
        <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        {/* left sidebar */}
        <Typography variant="h4">Edit</Typography>
        <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 3 }}>

          <TextField name="book title" variant="outlined" sx={{ input: { py: 2 } }} defaultValue={selectedBook.title} onChange={handleTitleChange}/>
          <TextField name="book author" variant="outlined" sx={{ input: { py: 2 } }} defaultValue={selectedBook.author} onChange={handleAuthorChange}/>
          <TextField name="book publication year" variant="outlined" sx={{ input: { py: 2 } }} defaultValue={selectedBook.yearPublished} onChange={handleYearChange}/>
          <TextField name="book genres" variant="outlined" sx={{ input: { py: 2 } }} defaultValue={selectedBook.genre} onChange={handleGenreChange}/>


            <Button variant="outlined" color="success" sx={{ py: 2 }} onClick={() => { editBook()}}>Update Book</Button>
        </Box>
  
        {/* book list */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, border: 1, borderColor: 'grey.400', borderRadius: 1 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedBook}
          label="Age"
          onChange={handleChange}
        >

        {bookInfo.map((book, idx) => (
                    <MenuItem key={idx} value={book}>{book.title}</MenuItem>
                ))
               }
         
        </Select>
      </FormControl>
        </Box>
      </Box>
      );
}