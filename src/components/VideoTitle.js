import React from 'react';
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";;

const VideoTitle = ({title,overview}) => {
  return (
    <div className='absolute bg-gradient-to-r from-black text-white pt-[20%] pl-10  w-screen aspect-video rounded-md'>
     <h1 className='text-5xl w-1/4 font-bold '>{title}</h1>
     <p className='py-6 w-1/3 text-lg'>{overview}</p>
     <div className='flex mt-3 gap-5'>
      <button className='bg-white px-10 py-2 flex gap-2 hover:bg-slate-200 transition-all duration-150 text-xl items-center rounded-sm text-black '><FaPlay size={20} />Play</button>
      <button className='bg-gray-400 px-10 py-2 text-xl hover:bg-slate-600 transition-all duration-150 bg-opacity-80 text-black  rounded-sm flex items-center gap-2 whitespace-nowrap '><IoIosInformationCircleOutline size={30}/>More Info</button>
     </div>
    </div>
  )
}

export default VideoTitle
