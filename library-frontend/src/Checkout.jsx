import * as React from "react";
import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Outlet, useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);


    
  return (
    <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
      {/* left sidebar */}
      <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 3 }}>
       

        <TextField label="Enter book title to checkout book" variant="outlined" sx={{ input: { py: 2 } }} />
        <Button variant="outlined" color="success" sx={{ py: 2 }}>SUBMIT</Button>
      </Box>

      <TextField label="booksearch" variant="outlined" sx={{ input: { py: 2 } }} />

        <Button variant="outlined" color="success" sx={{ py: 2 }} onClick={() => { }}>Add Book</Button>

    </Box>
  );
}