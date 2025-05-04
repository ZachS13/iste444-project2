import * as React from "react";
import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function AddBook(){
     
     const [books, setBooks] = useState([]);
     const [bookData, setBookData] = React.useState({
      title: "",
      author: "",
      yearPublished: 1900,
      genre: "",
    });
  
      useEffect(() => {
        
        
      }, []);
    

      return (
        <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
          {/* left sidebar */}
          <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Book title" variant="outlined" sx={{ input: { py: 2 } }} />
          <TextField label="Author" variant="outlined" sx={{ input: { py: 2 } }} />
          <TextField label="Year published" variant="outlined" sx={{ input: { py: 2 } }} />
          <TextField label="Genre(s)" variant="outlined" sx={{ input: { py: 2 } }} />

            <Button variant="outlined" color="success" sx={{ py: 2 }}>Add Book</Button>
          </Box>
    
        
        </Box>
      );
}