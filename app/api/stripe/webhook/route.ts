import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/data/env/server";
import { pricingTypes } from "@/data/pricing";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
  

export async function POST(req : Request) { 

    const endpointSecret = env.STRIPE_WEBHOOK_KEY;

    
    const signature = (await headers()).get("stripe-signature") as string

    if (!signature || !endpointSecret) {
        
        return NextResponse.json({ error: "Missing Stripe signature or secret" }, { status: 400 });
    }
    
    let event: Stripe.Event; 
    try { 
        const rawBody = await req.text();

        event = stripe.webhooks.constructEvent(rawBody,signature,endpointSecret)
    } catch (error) { 
        console.log(error)
        return new NextResponse("invalid signature",{status : 400})
    }

    const data = event.data.object as {id : string, customer : string}
    const eventType = event.type
    
    try { 
        switch (eventType) { 
            case "checkout.session.completed" : { 

                
               
                
                const session =  await stripe.checkout.sessions.retrieve(
                    data.id, 
                    {
                        expand : ["line_items"]
                    }
                )
                const customerId = data?.customer
                const customer = await stripe.customers.retrieve(customerId) as {email : string}

                const priceId = session?.line_items?.data[0].price?.id

                const plan = pricingTypes.find((type) => type.priceId === priceId )

                if (!plan) { 
                    break
                }
                
                if (customer.email) { 
                    const res = await db.select().from(users).where(eq(users.email , customer.email))

                    if (!res || res.length === 0) { 
                        
                        
                    } else { 
                        await db.update(users).set({
                            plan : plan.name.toLowerCase() as any , 


                        }).where(eq(users.email,customer.email))
                    }



                }

            }
            
            case "customer.subscription.deleted" : {
                

                // @ts-expect-error
                const session =  await stripe.subscriptions.retrieve(
                    data.id, 
                ) as {customer : string, plan : {id : string} }
                const priceId = session.plan.id
                
                const plan = pricingTypes.find((type) => type.priceId === priceId )!.name.toLowerCase() as "free" | "basic" | "premium"| null
                



                
                
                const customer = await stripe.customers.retrieve(session.customer) as { email : string}

                
                await db.update(users).set({
                    plan : plan ? plan : "free" 


                }).where(eq(users.email,customer.email))
            }
    }

        return new NextResponse("Success")
    } catch(error) { 

       console.log(error)
        return new NextResponse("Error",{status : 500})
    }
    
    
}