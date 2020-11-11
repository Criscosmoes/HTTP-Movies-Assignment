import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from 'axios'; 
import { useHistory } from 'react-router-dom';


const StyledAddMovie = styled.div`
  & {
    height: 40vh;
    background: gray;
  }
`;

const AddMovie = (props) => {
  const initialObject = {
    id: props.movieList.length + 1,
    title: "",
    director: "",
    metascore: "",
    stars: "",
  };

  const [movie, setMovie] = useState(initialObject);
  const { push } = useHistory(); 

  const onInputChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

 const onSubmit = (e) => {

    e.preventDefault(); 

    axios.post('http://localhost:5000/api/movies', movie)
    .then(res => {
        console.log(res)
        props.setMovieList(res.data); 
        push('/'); 
        
    })
    .catch(err => {
        console.log(err); 
    })
 }

  return (
    <StyledAddMovie>
      <form>
        <label>
          ID number:
          <input
            onChange={onInputChange}
            type="text"
            name="id"
            value={props.movieList.length + 1}
          />
        </label>

        <label>
          Title:
          <input
            onChange={onInputChange}
            name="title"
            type="text"
            value={movie.title}
          />
        </label>

        <label>
          Director:
          <input
            onChange={onInputChange}
            name="director"
            type="text"
            value={movie.director}
          />
        </label>

        <label>
          Metascore:
          <input
            onChange={onInputChange}
            name="metascore"
            type="text"
            value={movie.metascore}
          />
        </label>

        <label>
          Stars:
          <input onChange={onInputChange} value={movie.stars} type="text" name="stars" placeholder="Separate names by comma!" />
        </label>

        <button onClick={onSubmit}>Submit</button>
      </form>
    </StyledAddMovie>
  );
};

export default AddMovie;
