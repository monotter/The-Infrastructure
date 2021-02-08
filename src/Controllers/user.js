const {requestLog} = require("../Defines")
const db = require("ez-mongoose")
const _ = require("lodash")
const express = require('express')
const model = require("../Models/user")
const router = express.Router()

router.post("/api/user",async (req,res)=>{
    requestLog(req)
    let {mail,username} = req.body
    let user = await db.add(model.scheme,{mail,username})
    res.status(200).send(user)
})
router.get("/api/user",async (req,res)=>{
    requestLog(req)
    try {
        let {index,unit} = req.query
        index = index?index:0
        unit = unit?(unit>2000?2000:unit):100
        delete req.query.index, req.query.unit
        let users = await db.getMany(model.scheme,req.query)
        let chunks = _.chunk(users,unit)
        res.send({index,unit,length:users.length,chunks:chunks.length,chunk:chunks[index]})
    }
    catch {
        res.send({index:0,unit:0,length:0,chunks:0,chunk:[]})
    }
})
router.put("/api/user", async (req,res)=>{
    requestLog(req)
    let {_id, mail, username} = req.body
    let prop = {}
    if(mail) prop["mail"] = mail
    if(username) prop["username"] = username
    await db.save(model.scheme,{_id},{mail,username})
    let user = await db.get(model.scheme,{_id})
    res.status(200).send(user)
})
router.delete("/api/user",async (req,res)=>{
    requestLog(req)
    let {_id} = req.body
    let user = await db.get(model.scheme,{_id})
    await db.remove(model.scheme,{_id})
    res.status(200).send(user)
})

router.get("/user/:_id",async (req,res)=>{
    requestLog(req)
    let user = await db.get(model.scheme,req.params)
    res.render("user",user)
})
module.exports = router