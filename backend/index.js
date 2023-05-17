import express from 'express';
import mysql from 'mysql';

const PORT = 3000;

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Database_123!',
    database: 'test'
});

app.use(express.json());

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
  const q = 'INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)';
  const val = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [val], (err, result) => {
    if (err) throw err;
    res.json('Book has been added successfully');
  });
}); 

app.listen(PORT, () => {
    console.log(`Connected successfully on port ${PORT}`);
} );