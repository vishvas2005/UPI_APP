
const express = require('express')
const userRouter = require("./userRouter")
const accountrouter = require("./Accountroutes")
const router = express.Router();

router.use("/user" , userRouter)
router.use("/account", accountrouter )

module.exports = router;