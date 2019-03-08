var express = require('express');
var router = express.Router();
const db = require('../database');

router.post('/getCultureList', (req, res, next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        console.log(uid);
        const getCultureToDoQuery = `SELECT placename, note FROM culture WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1;`;
        db.query(getCultureToDoQuery,[uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/addCulture', (req, res, next)=>{
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
        const insertCultureQuery = `INSERT INTO culture (uid, placename, type, note, todo, favorite,reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
        db.query(insertCultureQuery, [uid, place, type, note, true, false, false]).then(() => {
            const getCultureToDoQuery = `SELECT placename, note FROM culture WHERE todo = true AND uid = $1;`;
            db.query(getCultureToDoQuery, [uid]).then((results2) => {
                res.json(results2)
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
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id
        const updateQuery = `UPDATE culture SET todo = false, favorite = true WHERE uid = $1
        AND placename = $2;`
        db.query(updateQuery, [uid, placename]).then((results)=>{
            const selectCultureToDoQuery = ` SELECT placename, note FROM culture WHERE uid =$1 AND 
            todo = true AND favorite = false;`;
            db.query(selectCultureToDoQuery, [uid]).then((results2) => {
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
        const deletePlaceQuery = `DELETE FROM culture where placename = $1 and uid = $2;`;
        console.log(placename)
        db.query(deletePlaceQuery, [placename, uid]).then((results)=>{
            console.log(results)
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectCultureToDoQuery = `SELECT placename, note FROM culture WHERE uid =$1 AND 
        todo = true AND favorite = false AND reviewed = false`;
        db.query(selectCultureToDoQuery, [uid]).then((results2)=>{
            console.log(results2);
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post("/filter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    console.log(filter)
    console.log(req.params)
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        console.log(results)
        const uid = results[0].id;
        const filterQuery = `SELECT placename, note FROM culture WHERE uid = $1 AND type = $2 AND favorite = false;`;
        db.query(filterQuery, [uid, filter]).then((results2) => {
            console.log(results2)
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2}
        })
    }).catch((error) => {
        if (error) {throw error}
    })    
})

router.post('/getCultureFaveList', (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const getFavesQuery = `SELECT placename, note FROM culture WHERE todo = false AND favorite = true AND uid = $1;`;
        db.query(getFavesQuery,[uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/addFaveInFavorites', (req, res, next)=>{
    console.log(req.body)
    const place = req.body.placename;
    const type = req.body.type;
    const note = req.body.note;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const insertCultureQuery = `INSERT INTO culture (uid, placename, type, note, todo, favorite,reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
        db.query(insertCultureQuery, [uid, place, type, note, false, true, false]).then(() => {
            const getCultureToDoQuery = `SELECT placename, note FROM culture WHERE favorite = true AND uid = $1;`;
            db.query(getCultureToDoQuery, [uid]).then((results2) => {
                res.json(results2)
            })
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post("/deleteFavePlace/:placename", (req,res,next)=>{
    const placename = req.params.placename;
    const email = req.body.email;
    console.log(req.body.email)
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id
        const deletePlaceQuery = `DELETE FROM culture where placename = $1 and uid = $2;`;
        console.log(placename)
        db.query(deletePlaceQuery, [placename, uid]).then((results)=>{
            console.log(results)
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectCultureToDoQuery = `SELECT placename, note FROM culture WHERE uid =$1 AND 
        todo = false AND favorite = true`;
        db.query(selectCultureToDoQuery, [uid]).then((results2)=>{
            console.log(results2);
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})




module.exports = router;