"use client"

import { Flame, LogIn } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import useSessionUser from '@/hooks/use-session-user'
import UserProfile from '../auth/UserProfile'
import { Badge } from '../ui/badge'
import { MotionDiv } from '@/lib/motion-wrapper'
import { capitalizeFirstLetter } from '@/lib/utils'
import { usePathname } from 'next/navigation'


const navLinks = [

    {
        name : "Features", 
        href : "#features"
    },
    {
        name : "Pricing", 
        href : "#pricing"
    },
    {
        name : "Reviews", 
        href : "#reviews"
    },
    {
        name : "Contact us", 
        href : "#contact"
    }

]
const Navbar = () => {

    const user = useSessionUser()
    const pathname = usePathname()

    
  return (
    <>
    <nav className='flex w-full justify-between py-3 px-3 items-center'>


        {/*  Logo  */}
        <Link href={user ? "/dashboard": "/"}>
            <MotionDiv initial={{ opacity : 0 , y : 5}} animate={{opacity : 1 , y: 0}} className='flex items-end gap-2'>

                <div>
                    <Flame className='fill-black text-primary' size={30} />
                </div>
            
                <div className='text-2xl leading-none'>
                    Maniacal AI
                </div>
                
            </MotionDiv>
        </Link>
        

        {user ? (

            <div className='flex gap-3 items-center'>
                <Badge variant={user.planType === "free" ? "secondary" : "default"} className='font-serif'>{capitalizeFirstLetter(user.planType)}</Badge>
                <ModeToggle />
                <UserProfile />
            </div>
        
        ) : (

          <>
            {/*  Landing page links  */}



            {pathname === "/" && <div className='hidden md:flex gap-2'>
                {navLinks.map((navLink) => <Button key={navLink.name} variant={"link"} asChild><Link scroll={false} onClick={(e) => smoothScroll(e, navLink.href.replace("#",""))}  href={navLink.href}>{navLink.name}</Link></Button>)}
                
            </div>}
            

            {/*  Auth Links  */}
            <div className='flex items-center gap-2'>
                <ModeToggle />
                <Button asChild><Link href={"/signin"}>Have an Account ?<LogIn /></Link></Button>
            </div>
          
          </>

        )}
        
    </nav>
    {!user && pathname === "/" && <div className='flex gap-2 md:hidden justify-center'>
            {navLinks.map((navLink) => <Button key={navLink.name} variant={"link"} asChild><Link href={navLink.href}>{navLink.name}</Link></Button>)}
            
    </div>}
    

    </>
  )
}


const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor behavior
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
export default Navbar
