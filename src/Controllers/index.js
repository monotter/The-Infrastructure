const express = require('express')
const router = express.Router()

router.get('/', async (req,res)=>{
    res.render("index")
})
router.get('/message', async (req,res)=>{
    res.render("message")
})
module.exports = router;