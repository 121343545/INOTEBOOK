const express = require('express');
const router=express.Router();
const User= require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')
const JWTSECRET='Azeemisagoodb$oy';
const { body, validationResult } = require('express-validator');
const { Router } = require('express');
//route1:create a user using post "/api/auth/createuser".Does not require authno login req

router.post('/createuser',[
    body('email','you enter wrong email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
],async (req,res)=>{
  let success=false;
  //if there are errors ,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //check wheater the user with email exist already
    try {
      
    
    let user=await User.findOne({email:req.body.email}); 
    if(user){
      return res.status(400).json({success,error:"Sorry a user already exist with this email"})
    }
     const salt=await bcrypt.genSalt(10);
      const secpass= await bcrypt.hash(req.body.password,salt);
      
    //create a new user
     user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      //.then(user => res.json(user))
      //.catch(err=> {console.log(err)
      // res.json( {error:'Please enter a unique value for email'})
    const data={
      user:{
        id:user.id
      }
    }
   const authtoken=  jwt.sign(data,JWTSECRET);
   
    //  res.json(user);
    success=true;
    res.json({success,authtoken});
    } catch (error) {
       console.log(error.message);
       res.status(500).send("some error occured"); 
    }  
      })
   //route2:User authentication "/api/auth/login".Does not require authno login req

   router.post('/login',[
    body('email','you enter wrong email').isEmail(),
    body('password','password cannot be blank').exists()
],async (req,res)=>{
  let success=false;
//if there are errors ,return bad request and the error
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
const {email,password}=req.body;
try {
  let user=await User.findOne({email});
  if(!user){
    success=false;
    res.status(400).json({error:"Please Try to login with correct credential"});
  }
  const passwordcompare=await bcrypt.compare(password,user.password)
  if(!passwordcompare){
    success=false;
    res.status(400).json({success,error:"Please Try to login with correct credential"});
  }
  const data={
    user:{
      id:user.id
    }
  }
 const authtoken=  jwt.sign(data,JWTSECRET);
 success=true;
 res.json({success,authtoken});
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error"); 
}
})
//route3:Get login user details "/api/auth/getuser".Does not require authno login req
router.post('/getuser',fetchuser,async (req,res)=>{
try {
  userId=req.user.id;
  const user=await User.findById(userId).select("-password");
  res.json(user);
  
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error"); 
}
})






module.exports=router;