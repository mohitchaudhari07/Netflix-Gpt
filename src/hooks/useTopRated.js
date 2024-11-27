import  { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constatns';
import { useDispatch } from 'react-redux';
import {  addTopRated} from "../utils/moviesSlice";

const useTopRated =() =>{


const dispatch = useDispatch();
  const getTopRated = async() =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);

    const json = await data.json();
   
    dispatch(addTopRated(json.results));
  };

  useEffect(() =>{
    getTopRated();

  },[]) ;
};

export default useTopRated;