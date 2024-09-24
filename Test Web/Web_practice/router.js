const { Router } = require('express')
const db = require('../db/User')

Router.post('/register', (req,res,next) =>{
    console.log(req,body)
    res.end()
})