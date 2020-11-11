import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
const StyledUpdateMovie = styled.div`
  & {
    height: 40vh;
    background: gray;
  }
`;

const UpdateMovie = (props) => {
  const initialObject = {
    title: "",
    director: "",
    metascore: "",
  };

  const [currentMovie, setCurrentMovie] = useState(initialObject);
  const params = useParams();
  const { push } = useHistory();

  const onInputChange = (e) => {
    setCurrentMovie({
      ...currentMovie,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentMovie = () => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log(res);
        setCurrentMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdateClick = e => {

    e.preventDefault(); 

    axios.put(`http://localhost:5000/api/movies/${params.id}`, currentMovie)
    .then(res => {
        console.log(res.data); 
        props.setMovieList(props.movieList.map(cur => {
          if(cur.id === res.data.id){
            return {
              ...cur, 
              title: currentMovie.title, 
              director: currentMovie.director, 
              metascore: currentMovie.metascore, 
            }
          }
          else {
            return cur; 
          }
        }))
        push('/'); 
    })
    .catch(err => {
        console.log(err); 
    })

   

  };

  useEffect(() => {
    getCurrentMovie();
  }, []);

  return (
    <StyledUpdateMovie>
      <form>
        <input
          onChange={onInputChange}
          value={currentMovie.title}
          type="text"
          name="title"
        />
        <input
          onChange={onInputChange}
          value={currentMovie.director}
          type="text"
          name="director"
        />
        <input
          onChange={onInputChange}
          value={currentMovie.metascore}
          type="text"
          name="metascore"
        />
        <button onClick={onUpdateClick} type="submit">Update</button>
      </form>
    </StyledUpdateMovie>
  );
};

export default UpdateMovie;
