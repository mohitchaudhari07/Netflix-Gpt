import Header from './Header';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopular';
import useUpcomingMovies from '../hooks/ussUpcomingMovies';
import useTopRated from '../hooks/useTopRated';


const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRated();
 
  return (
    <div className=''>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  ) 
}

export default Browse
