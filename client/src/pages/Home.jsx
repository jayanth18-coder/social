import React from 'react'
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state)=> state.user);

  return (
   <div className='home w-full px-0 lg:px-10 pb-20 2x1:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
  </div>
  );
};

export default Home;