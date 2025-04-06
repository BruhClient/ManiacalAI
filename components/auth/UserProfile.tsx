"use client"

import useSessionUser from "@/hooks/use-session-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Files, Handshake, LogOut, Settings, Sparkles, User, Wallet } from "lucide-react";
import { signOut } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import EditProfileForm from "../forms/profile";
import ProfileImageUploader from "../ProfileImageUploader";
import PricingPlans from "./PricingPlans";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/server/db/users";

function UserProfile() {
    const user = useSessionUser()
    

    const {data,isLoading} = useQuery({ 
        queryKey : ["projectsLeft",user?.id], 
        queryFn : async () => await getUserById(user?.id!),
        enabled : !!user
    })
    
    if (!user) { 
        return <Skeleton className="w-10 aspect-square rounded-full" />
    }

    

    

    
    return ( <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className="w-10 h-10" >
                <AvatarImage src={user.image} alt="Profile" className="object-cover" ></AvatarImage>
                <AvatarFallback><User/></AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">

            <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={user.image ?? undefined} alt="Profile" className="object-cover" ></AvatarImage>
                    <AvatarFallback><User/></AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-1">{user.username} </div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
                
                
            </div>

            {user.planType  === "free"  && <>
                <DropdownMenuSeparator />

                <div className="px-4 pb-2">
                    <div className="text-center font-serif text-sm py-2">

                        {data?.projectsLeft ? <span>Free Quota {`( ${data.projectsLeft} projects left ! )`}</span> : <span>Free Quota used up !</span>}
                        
                    </div>

                    {
                        data?.projectsLeft ?<Progress value={100 - data?.projectsLeft * 25} /> : <Progress value={100} />
                    }
                    
                </div>
            </>}
            
            
            <DropdownMenuSeparator />
            
                {user.planType === "free" && (<>
                    <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><Sparkles /> Upgrade to Pro</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex gap-2 items-center"><Files />Subscription Plans</DialogTitle>
                            <DialogDescription>Find the right plan that suits your needs</DialogDescription>
                        </DialogHeader>

                        <PricingPlans />
                        
                    </DialogContent>
                </Dialog>
                
          
            <DropdownMenuSeparator />   
                </>)}
                
            

                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><Settings /> Account settings</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex gap-2 items-center"><Settings /> Account settings</DialogTitle>
                            <DialogDescription>Make changes to your account here</DialogDescription>
                        </DialogHeader>
                        <ProfileImageUploader initialImage={user.image}/>
                        <EditProfileForm/>
                    </DialogContent>
                </Dialog>
                
           {user.planType !== "free" &&  <DropdownMenuItem asChild >
                <Link href={`https://billing.stripe.com/p/login/test_9AQaH4fyu65U23KdQQ?prefilled_email=${user.email}`} target="_blank"><Wallet /> Billing</Link>
                
            </DropdownMenuItem>
            }

            
           
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({
                callbackUrl : "/signin"
            })}>
                <LogOut />Sign out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu> );
}

export default UserProfile;