var express = require('express');
var router = express.Router();
const db = require('../database');

router.get('/getFoodList', (req, res, next)=>{
    // const uid = req.body.uid
    const getFoodToDoQuery = `SELECT placename, type FROM food;`;
    db.query(getFoodToDoQuery).then((results)=>{
        res.json(results)
        // console.log(results)
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post('/addFood', (req, res, next)=>{
    const place = req.body.placename
    const type = req.body.type
    console.log(place, type)
    const insertFoodQuery = `INSERT INTO food (uid, placename, type, todo) VALUES
    ($1, $2, $3, $4);`;
    db.query(insertFoodQuery, [3, place, type, true]).then((results)=>{
        res.json(results)
    }).catch((error)=>{
        if(error){throw error}
        const getFoodToDoQuery = `SELECT placename, type FROM food;`;
        db.query(getFoodToDoQuery, (error2, results2)=>{
            if(error2){throw error2}
            res.json(result2)
        })
    })
})

module.exports = router;