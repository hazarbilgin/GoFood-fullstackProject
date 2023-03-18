const express=require('express')
const router=express.Router()

const Order=require('../models/Orders')

router.post('orderData',async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    let eld=await Order.findOne({'email':req.body.email})
    console.log(eld);

    if(eld==null){
        try{
   await Order.create({
    email:req.body.email,
    order_data:[data]
   }).then(()=>{
    res.json({success:true})
   })
        }catch(error){
console.log(error.message);
res.send("Server Error",error.message)
        }
    }
    else{
        try {
            await Order.findeOneAndUpdate({email:req.body.email},
                {$push:{order_data:Order}}).then(()=>{
                    res.json({success:true})
                })
        } catch (error) {
            res.send("Server Error",error.message)
        }
    }
})

module.exports=router