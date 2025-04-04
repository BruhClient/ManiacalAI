import React from 'react'
import UploadForm from './_components/uploadform'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, FileUpIcon } from 'lucide-react'
import { MotionDiv } from '@/lib/motion-wrapper'

const UploadPage = () => {
  return (
    <MotionDiv initial={{ opacity : 0 , y : 5}} animate={{opacity : 1 , y: 0}} className='w-full h-[90vh] flex justify-center items-center flex-col gap-5'>

      <Card>
        <CardHeader>
          
          <CardTitle className='text-lg font-serif flex items-center gap-2'><FileUpIcon /> Upload your PDF</CardTitle>
          <CardDescription>Upload your files to be summarised.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <UploadForm />
          <Button variant={"link"}  asChild><Link href={"/dashboard"} className='text-center w-full pt-6'><ChevronLeft />Back to dashboard</Link></Button>
        </CardContent>
        
      </Card>
      
    </MotionDiv>
  )
}

export default UploadPage
