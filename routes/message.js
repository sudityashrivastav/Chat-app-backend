const route = require('express').Router();

route.get("/", async (req,res)=>{
  res.send("message ");
})

module.exports = route;