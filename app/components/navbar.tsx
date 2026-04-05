"use client"
import React, { useState } from 'react'

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
       {openModal && (
         <div className='text-black'>
            Opened nav
        </div>
       )}
        <button className='cursor-pointer text-black ' onClick={() => setOpenModal(!openModal)}>Open</button>
    </div>
  )
}

export default Navbar