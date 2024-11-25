import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movie = useSelector((store)=> store.movie?.nowPlayingMovies);
    
    if(!movie)return;

    const mainMovie = movie[0];
    
    JSON.stringify(mainMovie);

    const {original_title, overview , id} = mainMovie;
    
    



  return (
    <div className='overflow-x-hidden'>
        
      <VideoTitle title={original_title} overview={overview}  />
      <VideoBackground movieId ={id}/> 
    </div>
  )
}

export default MainContainer;
