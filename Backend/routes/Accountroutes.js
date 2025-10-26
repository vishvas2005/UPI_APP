const express = require('express')
const mongoose = require('mongoose')
const {authmiddleware} = require('../middleware')
const {Account} = require('../db');
const { abort } = require('process');

const router = express.Router();

router.get('/balance' ,authmiddleware , async (req , res)=>{
    const account = await Account.findOne({
        userId : req.userId
    });

    res.json({
        balance : account.balance
    })
})

router.post('/transfer' , authmiddleware , async ( req , res) =>{
    const session = await mongoose.startSession()
    session.startTransaction()
    const{amount , to} = req.body;
   
    const account = await Account.findOne({userId: req.userId}).session(session);
    if((!account) || account < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "insufficient balance"
        })
    }

    const toaccount = await Account.findOne({userId : to}).session(session)
    if(!toaccount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "account not found"
        })
    }

    //trabsaction started from here 
    await Account.updateOne({userId : req.userId} , {$inc : {balance : -amount}}).session(session)
    await Account.updateOne({userId : to} , {$inc : {balance : amount}}).session(session)

    await session.commitTransaction();
    res.json({
        message : "Transfer successfull"
    });
})
module.exports = router;
