import Header from './Header';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopular';
import useUpcomingMovies from '../hooks/ussUpcomingMovies';
import useTopRated from '../hooks/useTopRated';
import { useSelector } from 'react-redux';
import GptSearchMain from './GptSearchMain';


const Browse = () => {
   const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRated();
 
  return (
    <div className=''>
      <Header/>
      {
        showGptSearch ? <GptSearchMain/> :
      <><MainContainer/>
        <SecondaryContainer/>
        </>
      }
      
     
    </div>
  ) 
}

export default Browse;
