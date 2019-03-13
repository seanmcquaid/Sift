var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const randToken = require("rand-token");
const db = require("../database");


router.post("/register", (req,res,next)=>{
  const email = req.body.userEmail;
  const password = req.body.userPassword;
  const selectUserQuery = `SELECT * from users WHERE email = $1;`;
  db.query(selectUserQuery,[email]).then((results)=>{
    if(results.length === 0){
      const insertNewUserQuery = `INSERT INTO users (email,hash,token)
      VALUES($1,$2,$3);`;
      const hash = bcrypt.hashSync(password);
      const token = randToken.uid(50);
      db.query(insertNewUserQuery, [email,hash,token]).then((results)=>{
        res.json({
          msg : "userAdded",
          token,
          email
        })
      }).catch((error)=>{
        if(error){throw error}
      })
    } else{
      res.json({
        msg: "userExists"
      })
    }
  }).catch((error)=>{
    if(error){throw error};
  })

})

router.post('/login', function(req, res, next) {
  const email = req.body.userEmail;
  const password = req.body.userPassword;
  const selectUserQuery = `SELECT * from users WHERE email = $1;`;
  db.query(selectUserQuery,[email]).then((results)=>{
    if(results.length === 0){
      res.json({
        msg : "badUser"
      })
    } else {
      const checkHash = bcrypt.compareSync(password, results[0].hash);
      if(checkHash === true){
        const token = randToken.uid(50);
        const updateUserQuery = `UPDATE users SET token = $1 where email = $2;`;
        db.query(updateUserQuery,[token, email]).catch((error)=>{
          if(error){throw error};
        });
        res.json({
          msg : "loginSuccess",
          token,
          email
        })
      } else {
        res.json({
          msg : "badPassword"
        })
      }
    }
  }).catch((error)=>{
    if(error){throw error}
  })
});


router.post("/account", (req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  const selectUserQuery = `SELECT id from users where email = $1;`;
  db.query(selectUserQuery, [email]).then((results)=>{
      const uid = results[0].id;
      const updateUserQuery = `UPDATE users
            SET hash = $1
            WHERE id = $2 and email =$3;`;
      const hash = bcrypt.hashSync(password);
      db.query(updateUserQuery, [hash, uid, email])
      res.json('Yay, Updated')
  }).catch((error)=>{
    if(error){throw error};
  })
})

module.exports = router;