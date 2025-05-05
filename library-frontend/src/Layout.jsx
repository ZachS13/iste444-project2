import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2 }}>
      {/* top row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Ritchie Library</Typography>
        <Button variant="outlined" sx={{ borderRadius: '999px' }} onClick={() => navigate('/profile')}>Profile</Button>
      </Box>

      {/* nav bar */}
      <Box sx={{ display: 'flex', gap: 2, borderBottom: 1, pb: 1, mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/')}>View Books</Button>
        <Button variant="outlined" onClick={() => navigate('/my-books')}>View My Books</Button>
        <Button variant="outlined" onClick={() => navigate('/create-account')}>Create Account</Button>
        <Button variant="outlined" onClick={() => navigate('/sign-in')}>Sign In</Button>
      </Box>

      <Outlet />
    </Box>
  );
}