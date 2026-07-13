import React from 'react'
import { useState } from 'react';

const UserProfile = (props) => {
    const { profileImage, name } = props.user[0];
    const [toggle, settoggle] = useState(false);

    const toggleProfile = (e) => {
        const element = e.target.tagName;
        if (element === "DIV") {
            settoggle(false);
        }
    }
    return (
        <div className=' flex gap-2 '>
            <img src={profileImage} alt="user_profile" onClick={ (e) => {
                settoggle(true);
            }} className=' cursor-pointer rounded-full h-14 w-14 md:h-16 md:w-16 object-center ' />
          
            { toggle && <div onClick={(e) => {

            }} className='flex w-full h-screen fixed inset-0'>


                <div onClick={(e) => {
                    toggleProfile(e);
                }} className=' w-full cursor-pointer flex justify-center items-center  backdrop-blur-sm '>
                    <img src={profileImage} alt="user_profile" className=' rounded-full  w-48 h-48 md:w-60 md:h-60 object-center ' />
                </div>
            </div>}

            <div className=' text-xs md:text-base lg:text-lg  flex flex-col justify-center '>
                <h1 className=' text-[1.5em] '> {name} </h1>
                <small className=' text-[0.8em] ' > online-Last seen 2:00pm </small>
            </div>
        </div>
    )
}

export default UserProfile