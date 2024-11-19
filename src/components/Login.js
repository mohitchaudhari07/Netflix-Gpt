import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm , setIsSignInForm] = useState(true);

  const toggleSignInForm = (e) =>{
    setIsSignInForm(!isSignInForm);
    e.preventDefault();

  };
  return (
    <div className='h-screen'>
      
      <Header/>
      <img className='absolute' src='https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_medium.jpg' alt='background'/>
      <div className='w-[100%] h-full bg-black opacity-50 absolute left-0 top-0'></div>

      <form className='absolute flex flex-col px-10 py-10 w-3/12 text-white bg-black bg-opacity-75 rounded-md left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%]'>
       
       <h1 className='text-white font-bold opacity-100 mb-3 text-[30px]'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
       {!isSignInForm &&(
         <input type='text' placeholder='Full Name' className=' p-3 my-2 bg-gray-600 opacity-55 rounded-sm' />
       )}
        <input type='email' placeholder='Email Address' className=' p-3 my-2 bg-gray-600 opacity-55 rounded-sm' />
        <input type='password' placeholder='Password' className='p-3 bg-gray-600 opacity-55 my-2 rounded-sm' />
        
        <button className='p-4 my-2 mt-7 text-[15px] bg-red-600 rounded-md  text-white'>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className='mt-3'>{isSignInForm ? "New to Netflix?" : "Already User"} <span ><a href='/' className='font-bold' onClick={toggleSignInForm}>{isSignInForm ? "Sign Up Now." : "Sign In Now."} </a></span> </p>
      
        </form>
      
      
    </div>
  )
}

export default Login
