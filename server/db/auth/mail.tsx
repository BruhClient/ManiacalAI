
import { env } from "@/data/env/server"
import {Resend} from "resend"
import {EmailVerificationToken} from "@/components/mail/LinkTemplate"
import PasswordResetTemplate from "@/components/mail/PasswordResetTemplate"


const resend = new Resend(env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_VERCEL_URL

export const sendVerificationEmail = async ( email: string , token:string ) => { 
    
    const confirmLink = `${domain}/account-verification/${token}`

    await resend.emails.send({ 
        from : "mail@maniacalai.com", 
        to : email , 
        subject : "Confirm your email" , 
        react : <EmailVerificationToken href={confirmLink} email={email} />
    })

    
} 

export const sendPasswordResetEmail = async ( email: string , code:string ) => { 
    
    
    await resend.emails.send({ 
        from : "mail@maniacalai.com", 
        to : email , 
        subject : "Password Reset Code" , 
        react : <PasswordResetTemplate verificationCode={code} />
    })

    
} 
