import React from 'react'
import { Button } from '../ui/button'
import { Facebook, Github, Instagram } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

const Footer = () => {
  return (
    <footer className='w-full flex justify-center py-5 bg-muted mt-5' id='contact'>
        <div className='flex max-w-[1000px] w-full justify-between items-center flex-col lg:flex-row gap-3'>
            <div className='font-serif text-lg'>
                Maniacal.Ai @ 2025
            </div>

            <div className='flex gap-2'>
                <Button size={"icon"} ><Facebook /></Button>
                <Button size={"icon"}><SiWhatsapp /></Button>
                <Button size={"icon"}><Github /></Button>
                <Button size={"icon"}><Instagram /></Button>
            </div>
        </div>
        
        
      
    </footer>
  )
}

export default Footer
