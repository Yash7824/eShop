import React from 'react'
import eShopBanner from '../../assets/images/eShop.png';

const Login = () => {
  return (
    <div className='flex jusitfy-center align-middle h-[100vh] overflow-y-hidden'>
        <div className='flex-1 md:w-100 jusitfy-center align-middle w-80 h-[100vh]'>
            <h1 className='text-3xl font-bold text-center mt-[10rem]'>Login</h1>
            <div className='grid gap-5 mt-[2rem] justify-center align-middle'>
                <input type="text" name="username" placeholder='Username' className='text-1xl w-52 p-2 border border-slate-300 rounded-md focus:border-b-4 focus:border-indigo-400 focus:outline-none transition ease-in-out' />
                <input type="password" name="password" placeholder='Password' className=' text-1xl w-52 p-2 border border-slate-300 rounded-md focus:border-b-4 focus:border-indigo-400 focus:outline-none transition ease-in-out' />
                <button className='w-32 p-2 justify-self-center bg-black text-stone-100 rounded-md focus:bg-indigo-500 transition ease-in-out'>Login</button>
            </div>
        </div>
        <div className='flex-1 w-20'>
            <img src={eShopBanner} height="100%" width="100%" alt="banner-img" className='object-cover w-full h-full' />
        </div>


    </div>
  )
}

export default Login;