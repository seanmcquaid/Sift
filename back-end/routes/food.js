var express = require('express');
var router = express.Router();
const db = require('../database');

router.post('/getFoodList', (req, res, next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        console.log(uid);
        const getFoodToDoQuery = `SELECT placename, note FROM food WHERE todo = true AND favorite = false AND uid = $1;`;
        db.query(getFoodToDoQuery,[uid]).then((results2) => {
            res.json(results2)
            // console.log(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/getFoodFaveList', (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        console.log(uid);
        const getFavesToDoQuery = `SELECT placename, note FROM food WHERE todo = false AND favorite = true AND uid = $1;`;
        db.query(getFavesToDoQuery,[uid]).then((results2) => {
            res.json(results2)
            // console.log(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/addFood', (req, res, next)=>{
    console.log(req.body)
    const place = req.body.placename;
    const type = req.body.type;
    const note = req.body.note;
    const email = req.body.email;
    // console.log(place, type)
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        // console.log(results)
        const uid = results[0].id;
        const insertFoodQuery = `INSERT INTO food (uid, placename, type, note, todo, favorite) VALUES
        ($1, $2, $3, $4, $5, $6);`;
        db.query(insertFoodQuery, [uid, place, type, note, true, false]).then(() => {
            const getFoodToDoQuery = `SELECT placename, note FROM food WHERE todo = true AND uid = $1;`;
            db.query(getFoodToDoQuery, [uid]).then((results2) => {
                res.json(results2)
                // console.log(results2)
            })
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/addFave/:placename', (req, res, next)=>{
    const placename = req.params.placename;
    const email = req.body.email

    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id
        const updateQuery = `UPDATE food SET todo = false, favorite = true WHERE uid = $1
        AND placename = $2;`
        db.query(updateQuery, [uid, placename]).then((results)=>{
            const selectFoodToDoQuery = ` SELECT placename, note FROM food WHERE uid =$1 AND 
            todo = true AND favorite = false;`;
            db.query(selectFoodToDoQuery, [uid]).then((results2) => {
                res.json(results2)
            }).catch((error2) => {
                if (error2) { throw error2 };
            })
        }).catch((error)=>{
            if (error){throw error};
        })
    })
})

router.post("/deletePlace/:placename", (req,res,next)=>{
    const placename = req.params.placename;
    const email = req.body.email;
    console.log(req.body.email)
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id
        const deletePlaceQuery = `DELETE FROM food where placename = $1 and uid = $2;`;
        console.log(placename)
        db.query(deletePlaceQuery, [placename, uid]).then((results)=>{
            console.log(results)
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectFoodToDoQuery = `SELECT placename, note FROM food WHERE uid =$1 AND 
        todo = true AND favorite = false`;
        db.query(selectFoodToDoQuery, [uid]).then((results2)=>{
            console.log(results2);
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})


router.post("/addReview/:placename", (req,res,next)=>{
    const email = req.body.email;
    const placename = req.params.placename;
    const stars = req.body.stars;
    const review = req.body.review;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        
    }).catch((error)=>{
        if(error){throw error};
    })

})


module.exports = router;