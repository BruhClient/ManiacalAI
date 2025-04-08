import React from 'react'
import { Button } from '../ui/button'
import { Facebook, Github, Instagram } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

const Footer = () => {
  return (
    <footer className='w-full flex justify-center py-5 bg-muted mt-5' id='contact'>
        <div className='flex max-w-[1000px] w-full justify-between items-center flex-col lg:flex-row gap-3'>
            <div className='font-serif text-lg'>
                Maniacal AI @ 2025
            </div>

            <div className='flex gap-2'>
                <Button size={"icon"} variant={"ghost"} ><Facebook /></Button>
                <Button size={"icon"} variant={"ghost"}><SiWhatsapp /></Button>
                <Button size={"icon"} variant={"ghost"}><Github /></Button>
                <Button size={"icon"} variant={"ghost"}><Instagram /></Button>
            </div>
        </div>
        
        
      
    </footer>
  )
}

export default Footer
