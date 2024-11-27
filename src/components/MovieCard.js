import React from 'react'
import { IMAGE_CDN } from '../utils/constatns'

const MovieCard = ({posterPath}) => {
  
  return (
    <div className='w-36 rounded-sm'>
        <img className='rounded-md' alt='Movie Card' src={IMAGE_CDN + posterPath}/>
      
    </div>
  )
}

export default MovieCard
