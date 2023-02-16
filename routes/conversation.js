const route = require('express').Router();

route.get("/", async (req,res)=>{
  res.send("conversation ");
})

module.exports = route;