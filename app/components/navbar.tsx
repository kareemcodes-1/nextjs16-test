"use client"
import React, { useState } from 'react'

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
       {openModal && (
         <div className=''>
            Opened nav
        </div>
       )}
        <button className='cursor-pointer text-white ' onClick={() => setOpenModal(!openModal)}>Open</button>
    </div>
  )
}

export default Navbar