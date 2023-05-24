import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const PORT = 3000;

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Database_123!',
    database: 'test'
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result); 
    });
});

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)';
  const val = [
    req.body.title, 
    req.body.desc, 
    req.body.cover,
    req.body.price
  ];

  db.query(q, [val], (err, result) => {
    if (err) throw err;
    res.json('Book has been added successfully');
  });
}); 

app.delete('/books/:id', (req, res) => {
  const bookID = req.params.id;
  const q = 'DELETE FROM books WHERE id = ?';

  db.query(q, bookID, (err, result) => {
    if (err) throw err;
    res.json('Book has been deleted successfully');
  });
});

app.put('/books/:id', (req, res) => {
  const bookID = req.params.id;
  const q = 'UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?';

  const val = [
    req.body.title, 
    req.body.desc, 
    req.body.cover,
    req.body.price
  ];

  db.query(q, [...val, bookID], (err, result) => {
    if (err) throw err;
    res.json('Book has been updated successfully');
  });
});

app.listen(PORT, () => {
    console.log(`Connected successfully on port ${PORT}`);
} );