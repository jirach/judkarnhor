import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
