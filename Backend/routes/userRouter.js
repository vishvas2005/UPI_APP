const express = require('express');
const { z } = require('zod');
const {User} = require("../db")
const jwt = require("jsonwebtoken")
const router = express.Router()
const JWT_SECRET = "your_jwt_secret_here";
const {Account} = require('../db')
const {authmiddleware} = require("../middleware")

const singupschema = z.object({
    username : z.string().email(),
    password : z.string(),
    firstname : z.string(),
    lastname : z.string()
})

router.post('/signup' , async (req , res)=>{
    const body = req.body;
    const result = singupschema.safeParse(req.body);
    if(!result.success) {
     return res.json({
        message : "this username is already registered/ inavalid name"
     })
    }

    const existingUser = await User.findOne({
     username : body.username
    })

    if(existingUser){
        return res.json({
            message : "Email already taken / Incorrect inputs"
        })
    }
    const dbUser = await User.create(body);

    await Account.create({
        userId: dbUser._id,
        balance: Math.floor(Math.random() * 10000) + 1
      });

    const token = jwt.sign({
        userId: dbUser._id
    } , JWT_SECRET)
    res.json({
        message : "user created succesfully" ,
        token : token
    }) 
})

const signinschema = z.object({
    username : z.string().email(),
    password : z.string()
})

router.post("/signin" , async (req , res)=>{
    const request = signinschema.safeParse(req.body);
    if(!request.success){
       return res.status(411).json({
         message: "Email already taken / Incorrect inputs"
       })
    }  
    const user = await User.findOne({
      username : req.body.username,
      password : req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            message : "login successfully",
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updatebody = z.object({
    password : z.string().optional(),
    firstname : z.string().optional(),
    lastname : z.string().optional()
})

router.put("/update" , authmiddleware , async (req , res)=>{
    const {success} = updatebody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "Error while updating information"
        })     
    }

    await User.updateOne(
       { id : req.userId},
       {$set : req.body}
    )
    res.json({
        message : "updated successfully"
    })
}) 

router.get("/bulk" , async(req , res )=> {
   const filter = req.query.filter || "";

   const users = await User.find({
    $or:[
        { firstname: { $regex: filter, $options: "i" } },
        { lastname: { $regex: filter, $options: "i" } },
    ]
   })
   res.json({
    user : users.map(user =>({
        username : user.username,
        firstname : user.firstname,
        lastname : user.lastname,
        _id : user._id
    }))
   })
})
module.exports = router;