var express = require('express');
var router = express.Router();
const db = require('../database');

router.get('/getFoodList', (req, res, next)=>{
    // const uid = req.body.uid
    const getFoodToDoQuery = `SELECT placename, type FROM food`;
    db.query(getFoodToDoQuery).then((results)=>{
        res.json(results)
        // console.log(results)
    }).catch((error)=>{
        if(error){throw error}
    })
})

module.exports = router;