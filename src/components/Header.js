import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';



const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () =>{
  signOut(auth).then(() => {
    
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    navigate("/Error");
  });
};

const dispatch = useDispatch();

useEffect(() =>{
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const {uid,email,displayName} = user;
      dispatch(addUser({uid:uid,
        email:email,
        displayName:displayName,
        }));
        

        // navigate("/browse");
        if (user) {
          navigate("/browse");
        };
      


      // ...
    } else {
      // User is signed out
      dispatch(removeUser());
      navigate("/");
      
      // ...
    }
  });
  return () =>{
    unsubscribe();

  }
},[dispatch, navigate]);
   const handleGptSearchClick = () =>{
    dispatch(toggleGptSearchView());

   };

  return (
    <div className='text-black  bg-gradient-to-b from-lightblack md:fixed absolute w-screen px-8 py-2 z-50 flex flex-col md:flex-row justify-between '>
      <img className='w-48 z-40 md:mx-0 mx-auto' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo'/>

      {user &&(<div className=' flex align-center justify-center gap-2 px-8 pt-6 '>
        <button onClick={handleGptSearchClick} className='text-white mb-4 font-bold px-2 py-2 rounded-md bg-opacity-45  hover:bg-opacity-85 transform transition-all duration-600 bg-purple-500 mr-3'>{showGptSearch ? "Home" : "GPT Search"}</button>
        <img alt='usericon' className='w-10 h-10 rounded-sm  z-60'
        src="https://wallpapers.com/images/thumbnail/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"/>
        <button onClick={handleSignOut} className='font-bold text-white mb-4'>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header

//
