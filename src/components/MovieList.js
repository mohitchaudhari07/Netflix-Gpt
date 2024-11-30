import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title , movies}) => {
  
  

   
  return (
    <div className='pl-10  '>
        <h1 className='md:text-2xl text-lg  text-white pb-2 mb-2'>{title}</h1>
        <div className='flex  overflow-x-scroll scrollbar-hide'>
        <div className='flex  gap-4'>
         
          
          {movies ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))
          ) : (
            <p>No movies available</p>
          )}
       
        </div>
        </div>
      
    </div>
  )
}

export default MovieList
