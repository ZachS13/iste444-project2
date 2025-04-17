// Service layer
const express = require('express'),
      cors = require('cors'),
      app = express(),
      port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Successful connection!' });
});

// USER API ENDPOINTS
app.get('/api/v1/users', (req, res) => {
    res.json({ message: 'Returns a list of users' });
});

app.get('/api/v1/user/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `User with ID ${id}` });
});

app.post('/api/v1/user', (req, res) => {
    const { username, password } = req.body;
    res.json({ message: `User ${username} created successfully!` });
});


// BOOK API ENDPOINTS
app.get('/api/v1/books', (req, res) => {
    res.json({ message: 'Returns a list of books' });
});

app.get('/api/v1/book/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Book with ID ${id}` });
});

app.post('/api/v1/book', (req, res) => {
    const { title, author, genre, publishedYear } = req.body;
    res.json({ message: `Book ${title} by ${author} created successfully!` });
});

app.put('/api/v1/book/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publishedYear } = req.body;
    res.json({ message: `Book with ID ${id} updated successfully!` });
});

app.delete('/api/v1/book/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Book with ID ${id} deleted successfully!` });
});

// CHECKOUT API ENDPOINTS
app.get('/api/v1/checkout/:bookid', (req, res) => {
    const { bookid } = req.params;
    res.json({ message: `Checkout book with ID ${bookid}` });
});

app.post('/api/v1/checkout/:bookid', (req, res) => {
    const { bookid } = req.params;
    const { userId } = req.body;
    res.json({ message: `Checkout book with ID ${bookid} for user ${userId}` });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});