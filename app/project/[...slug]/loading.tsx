"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center w-screen flex-col items-center gap-3 px-2 pb-8 pt-10'>
          <div className='flex flex-col items-center gap-2 w-full max-w-[200px]'>
                <Skeleton className='w-full h-10'/>
              
                <Skeleton className='w-[50%] h-4'/>
                
                
                
                <div className='flex gap-2 w-full'>
                  
                  
                  <Skeleton className='w-full h-10'/>
                  <Skeleton className='w-full h-10'/>
                  
                
            
            
                </div>
          

        </div>
        <Skeleton className='w-[200px] h-10'/>

        <Card className='max-w-[800px] w-full h-[800px]'>
          <CardHeader>
            <CardTitle>
                  <Skeleton className='w-[50%] h-6'/>
            </CardTitle>
            <CardDescription>
                    <Skeleton className='w-[30%] h-4'/>
              </CardDescription>
          </CardHeader>
          <CardContent className=''>
            <Skeleton className='w-[50%] h-6'/>
            <div className='flex flex-col gap-2 mt-8'>
              <Skeleton className='w-full h-6'/>
              <Skeleton className='w-[50%] h-6'/>
            </div>
            <div className='flex flex-col gap-2 mt-8'>
              <Skeleton className='w-full h-6'/>
              <Skeleton className='w-full h-6'/>
              <Skeleton className='w-[50%] h-6'/>
            </div>
            <div className='flex flex-col gap-2 mt-8'>
              <Skeleton className='w-full h-6'/>
              <Skeleton className='w-full h-6'/>
              <Skeleton className='w-full h-6'/>
              <Skeleton className='w-[50%] h-6'/>
            </div>
            <div className='flex flex-col gap-2 mt-8'>
              <Skeleton className='w-full h-6'/>
              <Skeleton className='w-[50%] h-6'/>
            </div>
            
          </CardContent>
        </Card>
          
        </div>
  )
}

export default loading
