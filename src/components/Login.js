import React, { useRef, useState } from 'react'
import Header from './Header'
import { validate } from '../utils/validate';
import {  createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import {  updateProfile } from "firebase/auth";

const Login = () => {
  const [isSignInForm , setIsSignInForm] = useState(true);
  const [errorMsg , setErrorMsg] = useState(null);
  const navigate = useNavigate();

  
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);


  const handleButtonClick = (e) =>{
    e.preventDefault();
   
    const msg = validate(email.current.value , password.current.value);
   setErrorMsg(msg);

   if(msg){
   return;
   }

   if(!isSignInForm){
    //Sign Up Logic
    createUserWithEmailAndPassword(
      auth
    , email.current.value 
    , password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: 'https://wallpapers.com/images/thumbnail/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp',
    }).then(() => {
      // Profile updated!
      // ...
      // navigate("/browse");
    }).catch((error) => {
      // An error occurred
      // ...
      setErrorMsg(error.message)
    });

    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode+ '-' + errorMessage);
    // ..
  });
    

   }
   else{
    //Sign In Logic

    signInWithEmailAndPassword(auth,email.current.value , password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode + "-" + errorMessage);
  });

   }
    
   

   
  }

  const toggleSignInForm = (e) =>{
    setIsSignInForm(!isSignInForm);
    e.preventDefault();
    setErrorMsg(null);

  };
  return (
    <div className=''>
      
      <Header/>
      <img className='absolute ' src='https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_medium.jpg' alt='background'/>
      <div className='w-full h-[854px] bg-black opacity-50 absolute left-0 top-0'></div>

      <form onSubmit={(e) => e.preventDefault()} className='absolute flex flex-col px-10 py-10 w-3/12 text-white bg-black bg-opacity-75 rounded-md left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%]'>
       
       <h1 className='text-white font-bold opacity-100 mb-3 text-[30px]'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
       {!isSignInForm &&(
         <input ref={name}  type='text' placeholder='Full Name' className=' p-3 my-2 bg-gray-600 opacity-55  rounded-sm' />
       )}
        <input ref={email} type='email' placeholder='Email Address' className=' p-3 my-2 bg-gray-600 opacity-55 rounded-sm' />
        <input ref={password} type='password' placeholder='Password' className='p-3 bg-gray-600 opacity-55 my-2 rounded-sm' />
        <p className='text-red-500'>{errorMsg}</p>
        <button onClick={handleButtonClick} className='p-4 my-2 mt-7 text-[15px] bg-red-600 rounded-md  text-white'>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className='mt-3'>{isSignInForm ? "New to Netflix?" : "Already User"} <span ><a href='/' className='font-bold' onClick={toggleSignInForm}>{isSignInForm ? "Sign Up Now." : "Sign In Now."} </a></span> </p>
      
        </form>
      
      
    </div>
  )
}

export default Login
