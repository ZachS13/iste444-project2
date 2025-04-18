// Service layer
const express = require('express'),
      cors = require('cors'),
      app = express(),
      business = require(`./business.js`),
      port = 3000;

app.use(cors());
app.use(express.json());

// DEFAULT ENDPOINT
app.get('/api/v1/', (req, res) => {
    res.status(200).send('OK');
});

// USER API ENDPOINTS
app.get('/api/v1/users', async (req, res) => {
    const users = await business.getAllUsers();
    if(!users) {
        return res.status(404).json({ error: 'There was an error getting all of the users!' });
    } else if (users.length === 0) {
        return res.status(404).json({ error: 'There are no users!' });

    }
    return res.json({ message: users });
});

app.get('/api/v1/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await business.getUserById(id);
    if(!user) {
        return res.status(404).json({ error: `There was an error getting the user!` });
    }
    return res.json({ message: user });
});

app.post('/api/v1/user', async (req, res) => {
    const { username, password } = req.body;
    const newUser = await business.createUser(username, password);
    if(!newUser) {
        return res.status(404).json({ error: 'There was an error creating the user!' });
    }
    return res.json({ message: newUser });
});


// BOOK API ENDPOINTS
app.get('/api/v1/books', async (req, res) => {
    const books = await business.getAllBooks();
    if(!books) {
        return res.status(404).json({ error: 'There was an error getting all of the books!' });
    } else if (books.length === 0) {
        return res.status(404).json({ error: 'There are no books!' });
    }
    return res.json({ message: books });
});

app.get('/api/v1/book/:id', async (req, res) => {
    const { id } = req.params;
    const book = await business.getBookById(id);
    if(!book) {
        return res.status(404).json({ error: `There was an error getting the book!` });
    }
    return res.json({ message: book });
});

app.post('/api/v1/book', async (req, res) => {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear) {
        return res.status(400).json({ error: 'All fields are required!' });
    }
    const newBook = await business.createBook(title, author, genre, publishedYear);
    if(!newBook) {
        return res.status(404).json({ error: 'There was an error creating the book!' });
    }
    return res.json({ message: newBook });
});

app.put('/api/v1/book/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear) {
        return res.status(400).json({ error: 'All fields are required!' });
    }
    const updatedBook = await business.updateBook(id, title, author, genre, publishedYear);
    if(!updatedBook) {
        return res.status(404).json({ error: 'There was an error updating the book!' });
    }
    return res.json({ message: updatedBook });
});

app.delete('/api/v1/book/:id', async (req, res) => {
    const { id } = req.params;
    const deletedBook = await business.deleteBook(id);
    if(!deletedBook) {
        return res.status(404).json({ error: 'There was an error deleting the book!' });
    }
    return res.json({ message: `Book with ID ${id} deleted successfully!` });
});


// CHECKOUT API ENDPOINTS
app.get('/api/v1/checkout/:bookid', async (req, res) => {
    const { bookid } = req.params;
    const checkedoutBook = await business.getCheckedoutBook(bookid);
    if(!checkedoutBook) {
        return res.status(404).json({ error: 'There was an error checking out the book!' });
    }
    return res.json({ message: checkedoutBook });
});

app.post('/api/v1/checkout/:bookid', async (req, res) => {
    const { bookid } = req.params;
    const { userId } = req.body;
    const checkout = await business.checkoutBook(bookid, userId);
    if(!checkout) {
        return res.status(404).json({ error: 'There was an error checking out the book!' });
    }
    return res.json({ message: checkout });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});