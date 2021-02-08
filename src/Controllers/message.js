const {requestLog} = require("../Defines")
const db = require("ez-mongoose")
const _ = require("lodash")
const express = require('express')
const model = require("../Models/message")
const router = express.Router()

router.post("/api/message",async (req,res)=>{
    requestLog(req)
    let {content,sender} = req.body
    let message = await db.add(model.scheme,{content,sender})
    res.status(200).send(message)
})
router.get("/api/message",async (req,res)=>{
    requestLog(req)
    try {
        let {index,unit} = req.query
        index = index?index:0
        unit = unit?(unit>2000?2000:unit):100
        delete req.query.index, req.query.unit
        let messages = await db.getMany(model.scheme,req.query)
        let chunks = _.chunk(messages,unit)
        res.send({index,unit,length:messages.length,chunks:chunks.length,chunk:chunks[index]})
    }
    catch {
        res.send({index:0,unit:0,length:0,chunks:0,chunk:[]})
    }
})
router.put("/api/message", async (req,res)=>{
    requestLog(req)
    let {_id, content, sender} = req.body
    let prop = {}
    if(content) prop["content"] = content
    if(sender) prop["sender"] = sender
    await db.save(model.scheme,{_id},{content,sender})
    let message = await db.get(model.scheme,{_id})
    res.status(200).send(message)
})
router.delete("/api/message",async (req,res)=>{
    requestLog(req)
    let {_id} = req.body
    let message = await db.get(model.scheme,{_id})
    await db.remove(model.scheme,{_id})
    res.status(200).send(message)
})

router.get("/message/:_id",async (req,res)=>{
    requestLog(req)
    let message = await db.get(model.scheme,req.params)
    res.render("message",message)
})
module.exports = router