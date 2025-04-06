"use client"

import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'

const loading = () => {
  return (
    <div className='w-full h-[90vh] flex justify-center items-center'>
        <ClimbingBoxLoader size={15} className='bg-primary rounded-full p-24'/>
    </div>
  )
}

export default loading
