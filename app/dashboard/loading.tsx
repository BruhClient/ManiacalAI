"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'

const loading = () => {
  return (
    <div className="w-full px-3 py-3">
        <div className="text-3xl font-serif pl-3">
            Projects <Button size={"icon"} variant={"ghost"} asChild><Link href={"/dashboard/upload"}><Plus /></Link></Button>
        </div>

        <div className="w-full h-[80vh]">

            
            
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-3 py-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <Skeleton className='w-[50%] h-6'/>
                        </CardTitle>
                        <CardDescription>
                          <Skeleton className='w-[30%] h-4'/>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex h-full items-end  gap-2 justify-end">
                        <Skeleton className='w-24 h-8'/>
                        <Skeleton className='w-24 h-8'/>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <Skeleton className='w-[50%] h-6'/>
                        </CardTitle>
                        <CardDescription>
                          <Skeleton className='w-[30%] h-4'/>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex h-full items-end  gap-2 justify-end">
                        <Skeleton className='w-24 h-8'/>
                        <Skeleton className='w-24 h-8'/>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <Skeleton className='w-[50%] h-6'/>
                        </CardTitle>
                        <CardDescription>
                          <Skeleton className='w-[30%] h-4'/>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex h-full items-end  gap-2 justify-end">
                        <Skeleton className='w-24 h-8'/>
                        <Skeleton className='w-24 h-8'/>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <Skeleton className='w-[50%] h-6'/>
                        </CardTitle>
                        <CardDescription>
                          <Skeleton className='w-[30%] h-4'/>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex h-full items-end  gap-2 justify-end">
                        <Skeleton className='w-24 h-8'/>
                        <Skeleton className='w-24 h-8'/>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <Skeleton className='w-[50%] h-6'/>
                        </CardTitle>
                        <CardDescription>
                          <Skeleton className='w-[30%] h-4'/>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex h-full items-end  gap-2 justify-end">
                        <Skeleton className='w-24 h-8'/>
                        <Skeleton className='w-24 h-8'/>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <Skeleton className='w-[50%] h-6'/>
                        </CardTitle>
                        <CardDescription>
                          <Skeleton className='w-[30%] h-4'/>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex h-full items-end  gap-2 justify-end">
                        <Skeleton className='w-24 h-8'/>
                        <Skeleton className='w-24 h-8'/>
                      </CardContent>
                    </Card>
                    
                    
                
                
            </div>
            
            

        </div>
    </div>
  )
}

export default loading
