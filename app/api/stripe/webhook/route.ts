import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/data/env/server";
import { pricingTypes } from "@/data/pricing";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserByEmail } from "@/server/db/users";

async function getRawBody(readable: ReadableStream<Uint8Array>): Promise<Buffer> {
    const reader = readable.getReader();
    const chunks: Uint8Array[] = [];
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
  
    return Buffer.concat(chunks);
  }
  

export async function POST(req : NextRequest) { 

    const endpointSecret = env.STRIPE_WEBHOOK_KEY;
    
    const signature = (await headers()).get("stripe-signature") as string

    if (!signature || !endpointSecret) {
        
        return NextResponse.json({ error: "Missing Stripe signature or secret" }, { status: 400 });
    }
    
    let event: Stripe.Event; 
    try { 

        

        const rawBody = await getRawBody(req.body!);

        

        event = stripe.webhooks.constructEvent(rawBody,signature,endpointSecret)
    } catch (error) { 
        console.log(error)
        return new NextResponse("invalid signature",{status : 400})
    }
    //@ts-ignore
    const data = event.data.object as {id : string, customer : string , plan : {id : string} }
    const eventType = event.type
    
    try { 
        switch (eventType) { 
            case "checkout.session.completed" : { 

                console.log("----------------SESSION COMPLETED----------------")
               
                
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
            case "customer.subscription.updated" : { 
           
                //@ts-ignore
                const session =  await stripe.subscriptions.retrieve(
                    data.id, 
                ) as {customer : string, plan : {id : string} }

                

                

                const type = pricingTypes.find((type) => type.priceId === session.plan.id)?.name.toLowerCase() as "free" | "basic" | "premium" | null
                
                const customer = await stripe.customers.retrieve(data.customer) as { email : string}

           

                
                await db.update(users).set({
                    plan : type ? type : "free"


                }).where(eq(users.email,customer.email))

                
            }
            
            
            case "customer.subscription.deleted" : {
             
                const session =  await stripe.subscriptions.retrieve(
                    data.id, 
                ) as {customer : string }

                


                const customer = await stripe.customers.retrieve(data.customer) as { email : string}

                const user = await getUserByEmail(customer.email)
                if (!user) {
                    return new NextResponse("User not logged in",{status : 500}) 
                } 

                const activeSub = await stripe.subscriptions.list({
                    customer: session.customer,
                    status: "active",
                    limit: 1,
                  });

                if (activeSub.data.length > 0) {
                    // They still have an active subscription — don't downgrade
                    console.log("🟡 Subscription deleted but user has another active one (likely plan change).");
                    return new NextResponse("Subsciption updated",{status : 500});
                  }
                
                await db.update(users).set({
                    plan : "free"


                }).where(eq(users.email,customer.email))
            }
    }

        return new NextResponse("Success")
    } catch(error) { 

       console.log(error)
        return new NextResponse("Error",{status : 500})
    }
    
    
}