import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try{
        const res = await axios.get('http://localhost:3000/books')
        console.log(res.data)
        setBooks(res.data);
      } catch (err){
        console.log(err);
      }
    };
    fetchAllBooks();
  },[ ]);

  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:3000/books/${id}`);
      window.location.reload();
    }catch (err) {
      console.log(err);
    }
  };

  return ( <div>
    <h1 className="title" >My library</h1>
    <div className="books">
      {books.map((book) => (
        <div className="book" key={book.id}>
          {book.cover && <img src={book.cover} alt={book.title} />}
          <h3>{book.title}</h3>
          <p>{book.desc}</p>
          <span>{`$ ${book.price}`}</span>
          <button className="delete" onClick={() => handleDelete(book.id)} >Delete</button>
          <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
        </div>
      ))}
    </div>
    <button className="add" ><Link to='/add'>Add new book</Link></button>
  </div> );
}
 
export default Books;