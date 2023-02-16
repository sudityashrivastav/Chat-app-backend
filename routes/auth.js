const route = require('express').Router();
const bcrypt = require('bcrypt')
const supabase = require("../db.js")

route.post("/signup", async (req, res) => {

  const { signUsername, signPassword } = req.body;
  if (!signUsername) {
    return res.status(401).json({ "error": "Please enter username" });
  } else if (!signPassword) {
    return res.status(401).json({ "error": "Please enter password" });
  }
  else {

    const { data } = await supabase.from('login-signup').select('*').eq('username', signUsername);
    if (data.length > 0) {
      return res.status(401).json({ error: "Username not available" })
    }
    else {
      const hashPassword = await bcrypt.hash(signPassword, 10)
      const { error } = await supabase.from('login-signup').insert({ username: signUsername, password: hashPassword });
      if (error) {
        res.json({ error: error })
      }
      else {
        res.status(201).json({ success: 'Account has been created' })
      }
    }
  }
  res.json({ response: res });
});

route.post("/login", async (req, res) => {
  const { loginUsername, loginPassword } = req.body;
  if (!loginUsername) {
    return res.status(401).json({ "error": "Please enter username" });
  }
  else if (!loginPassword) {
    return res.status(401).json({ "error": "Please enter password" });
  }

  else {
    const { data } = await supabase.from('login-signup').select('*').eq("username", loginUsername);

    if (data.length == 0) {
      res.status(401).json({ error: "Invalid username" });
    }

    else {
      //console.log(data[0].password);
      const isPass = await bcrypt.compare(data[0].password, loginPassword);
    //  const comp = await bcrypt.hash(loginPassword, 10);
   //   console.log(comp);
      console.log(data[0]. password)
     // console.log(loginPassword);
      if (isPass) {
        res.json({ success: 'Login succesfull' });
      }

      else {
        res.status(401).json({ error: "Invalid password" });
      }
      
    }
  }
});

module.exports = route;