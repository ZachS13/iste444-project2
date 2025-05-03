import * as React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HomePage() {
  return (
    <Box sx={{ p: 2 }}>
      {/* top row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Ritchie Library</Typography>
        <Button variant="outlined" sx={{ borderRadius: '999px' }}>Profile</Button>
      </Box>

      {/* nav bar */}
      <Box sx={{ display: 'flex', gap: 2, borderBottom: 1, pb: 1, mb: 2 }}>
        <Button variant="outlined">View Books</Button>
        <Button variant="outlined">View My Books</Button>
        <Button variant="outlined">Create Account</Button>
        <Button variant="outlined">Sign In</Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        {/* left sidebar */}
        <Box
        sx={{
            width: '25%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
        }}
        >
        <Button variant="outlined" sx={{ py: 2 }}>Add Book</Button>

        <TextField
            label="Enter book title to checkout book"
            variant="outlined"
            sx={{ input: { py: 2 } }} 
        />

        <Button variant="outlined" color="success" sx={{ py: 2 }}>
            SUBMIT
        </Button>
        </Box>


        {/* book list */}
        <Box
        sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            border: 1,
            borderColor: 'grey.400',
            borderRadius: 1,
        }}>
            <List sx={{ width: '100%', maxWidth: 600 }}>
                <Box sx={{ border: 1, borderColor: 'grey.400', borderRadius: 1, mb: 2, p: 1 }}>
                <ListItem disablePadding>
                    <ListItemText primary="Book 1" secondary="Author | Publication date" />
                </ListItem>
                </Box>

                <Box sx={{ border: 1, borderColor: 'grey.400', borderRadius: 1, mb: 2, p: 1 }}>
                <ListItem disablePadding>
                    <ListItemText primary="Book 2" secondary="Author | Publication date" />
                </ListItem>
                </Box>
            </List>
        </Box>
      </Box>
    </Box>
  );
}
