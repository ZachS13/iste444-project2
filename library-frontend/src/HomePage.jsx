import * as React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function HomePage() {

return (

    <><h1>
        Ritchie Library
    </h1>
    
    
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <p>Book 1</p>
                <p>Author</p>
                <p>Publication date</p>
            </ListItem>
            <ListItem>

            <ListItemText primary="Book 2" secondary="Publication date" />
               
                <p>Author</p>
               
            </ListItem>
        </List></>

);
}