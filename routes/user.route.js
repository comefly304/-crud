const UserRouter=require('express').Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/user.model')



//register
UserRouter.post("/register",async(req,res)=>{
    try{
   const {username,email,password}=req.body
   const hash=await bcrypt.hash(password,10)
   const newuser=new User({
    username,
    email,
    password:hash
   })
   try{
        await newuser.save()
        return res.json({
            msg:"user has been registered succesfuly...please login ",
            user:newuser
        })
   }catch(err){
    return res.send(err)
   }
    }catch(err){
        return res.send(err)
    }
})


//login
UserRouter.post("/login",async(req,res)=>{
    try{
  const {email,password}=req.body
  const user=await User.findOne({email})
  
  if(user.email===req.body.email){
    if(req.body.password===user.password){
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
        return res.json({
            msg:"login successful",
            token:token,
            user:user
        })
    }
  }
    }catch(err){
        return res.send('invalid credentials')
    }
})


//get
UserRouter.get("/get",async(req,res)=>{
    try{
   const user=await User.find()
   return res.json({
    data:user
   })
    }catch(err){
        return res.send(err)
    }
})

//get by id 
UserRouter.get("/get/:id",async(req,res)=>{
    try{
        const {id}=req.params
   const user=await User.findById(id)
   return res.json({
    data:user
   })
    }catch(err){
        return res.send(err)
    }
})

//update
UserRouter.put("/update/:id",async(req,res)=>{
    try{
        const {id}=req.params
   const user=await User.findByIdAndUpdate(id,{
    $set:req.body
   },{
    new:true
   })
   return res.json({
    msg:"updated succesfully",
    data:user
   })
    }catch(err){
        return res.send(err)
    }
})

//delete
UserRouter.delete("/delete/:id",async(req,res)=>{
    try{
        const {id}=req.params
  await User.findByIdAndDelete(id)
   return res.json({
    msg:"deleted successfully"
   })
    }catch(err){
        return res.send(err)
    }
})





module.exports=UserRouter
