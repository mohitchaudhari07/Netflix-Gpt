import Header from './Header';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {
  useNowPlayingMovies();
 
  return (
    <div className='overflow-x-hidden w-screen'>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  ) 
}

export default Browse
