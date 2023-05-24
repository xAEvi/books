import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {

  const [book, setbook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setbook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async e => {
    e.preventDefault();
    try{
      await axios.post('http://localhost:3000/books', book)
      navigate('/');
    } catch (err){
      console.log(err);
    }
  }

  return ( 
    <div>
      <div className="form">
        <h1>Add new Book</h1>
        <input type="text" placeholder="title" onChange={handleChange} name="title"/>
        <input type="text" placeholder="desc" onChange={handleChange} name="desc"/>
        <input type="number" placeholder="price" onChange={handleChange} name="price"/>
        <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
      </div>
      <button className="formButton" onClick={handleClick}>Add</button>
    </div>
   );
}
 
export default Add;