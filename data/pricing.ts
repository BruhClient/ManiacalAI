

export const pricingTypes = [

    { 
         name : "Free" , 
         price : 0 , 
         priceId : "", 
         fileSize : 4,
         numOfProjects : "4" , 
         discounts : "", 
         support : true , 
         AiAnaysis : true , 
         community : false , 
         isPopular : false, 
         description : "For highschoolers"

    },
    { 
        name : "Basic" , 
        price : 25 , 
        priceId : "price_1RA6fSPRXBHsXHW5kE7RonY7", 
        fileSize : 4,
        discounts: 50, 
        numOfProjects : "Unlimited" , 
        support : true , 
        link : "https://buy.stripe.com/test_00g3dT56b91odkA6op", 
        AiAnaysis : true , 
        community : true , 
        isPopular : true, 
        description : "For college students"

   },
   { 
    name : "Premium" , 
    price : 39 , 
    priceId : "price_1RA6fjPRXBHsXHW5CHaqAsSw", 
    fileSize : 6,
    numOfProjects : "Unlimited" , 
    support : true , 
    discounts : 100,
    link : "https://buy.stripe.com/test_00g3dT2Y3elIbcs288",
    AiAnaysis : true , 
    community : true , 
    isPopular : false, 
    description : "For a very dedicated individual"

}
]

export type Pricing = typeof pricingTypes[0]