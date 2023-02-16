const express = require('express')
const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
  res.send("Home")
  //res.send(process.env['Hello']);
});

app.use("/auth", require("./routes/auth.js"))
app.use("/message", require("./routes/message.js"))
app.use("/conversation", require("./routes/conversation.js"))

app.listen(1543, ()=>{
  console.log("Good to go");
});