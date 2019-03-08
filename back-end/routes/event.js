var express = require('express');
var router = express.Router();
const db = require('../database');

router.post('/getEventList', (req, res, next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        console.log(uid);
        const getEventToDoQuery = `SELECT eventname, note FROM events WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1;`;
        db.query(getEventToDoQuery,[uid]).then((results2) => {
            res.json(results2)
            // console.log(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/getEventFaveList', (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const getFavesQuery = `SELECT eventname, note FROM events WHERE todo = false AND favorite = true AND uid = $1;`;
        db.query(getFavesQuery,[uid]).then((results2) => {
            res.json(results2)
            // console.log(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/addEvent', (req, res, next)=>{
    console.log(req.body)
    const event = req.body.eventname;
    const type = req.body.type;
    const date = req.body.date;
    const note = req.body.note;
    const email = req.body.email;
    // console.log(place, type)
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        // console.log(results)
        const uid = results[0].id;
        const insertEventQuery = `INSERT INTO events (uid, eventname, type, date, note, todo, favorite, reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8);`;
        db.query(insertEventQuery, [uid, event, type, date, note, true, false, false]).then(() => {
            const getEventQuery = `SELECT eventname, note FROM events WHERE todo = true AND uid = $1;`;
            db.query(getEventQuery, [uid]).then((results2) => {
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

router.post('/addFaveInFavorites', (req, res, next)=>{
    console.log(req.body)
    const event = req.body.eventname;
    const type = req.body.type;
    const date = req.body.date;
    const note = req.body.note;
    const email = req.body.email;
    // console.log(place, type)
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        // console.log(results)
        const uid = results[0].id;
        const insertEventQuery = `INSERT INTO events (uid, eventname, type, date, note, todo, favorite, reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8);`;
        db.query(insertEventQuery, [uid, event, type, date, note, false, true, false]).then(() => {
            const getEventQuery = `SELECT eventname, note FROM events WHERE favorite = true AND uid = $1;`;
            db.query(getEventQuery, [uid]).then((results2) => {
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

router.post('/addFave/:eventname', (req, res, next)=>{
    const eventname = req.params.eventname;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id
        const updateQuery = `UPDATE events SET todo = false, favorite = true WHERE uid = $1
        AND eventname = $2;`
        db.query(updateQuery, [uid, eventname]).then((results)=>{
            const selectEventToDoQuery = ` SELECT eventname, note FROM events WHERE uid =$1 AND 
            todo = true AND favorite = false;`;
            db.query(selectEventToDoQuery, [uid]).then((results2) => {
                res.json(results2)
            }).catch((error2) => {
                if (error2) { throw error2 };
            })
        }).catch((error)=>{
            if (error){throw error};
        })
    })
})

router.post("/deleteEvent/:eventname", (req,res,next)=>{
    const eventname = req.params.eventname;
    const email = req.body.email;
    console.log(req.body.email)
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id
        const deleteEventQuery = `DELETE FROM events where eventname = $1 and uid = $2;`;
        console.log(eventname)
        db.query(deleteEventQuery, [eventname, uid]).then((results)=>{
            console.log(results)
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectEventToDoQuery = `SELECT eventname, note FROM events WHERE uid =$1 AND 
        todo = true AND favorite = false`;
        db.query(selectEventToDoQuery, [uid]).then((results2)=>{
            console.log(results2);
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post("/deleteFaveEvent/:eventname", (req,res,next)=>{
    const eventname = req.params.eventname;
    const email = req.body.email;
    console.log(req.body.email)
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id
        const deleteEventQuery = `DELETE FROM events where eventname = $1 and uid = $2;`;
        console.log(eventname)
        db.query(deleteEventQuery, [eventname, uid]).then((results)=>{
            console.log(results)
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectEventToDoQuery = `SELECT eventname, note FROM events WHERE uid =$1 AND 
        todo = false AND favorite = true`;
        db.query(selectEventToDoQuery, [uid]).then((results2)=>{
            console.log(results2);
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post("/getEventReviews", (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const selectReviewsQuery = `SELECT eventname, review from events WHERE uid = $1 AND reviewed = true;`;
        db.query(selectReviewsQuery,[uid]).then((results2)=>{
            // console.log(results2);
            res.json(results2);
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post("/addEventReview/:eventname", (req,res,next)=>{
    const email = req.body.email;
    const eventname = req.params.eventname;
    const stars = req.body.stars;
    const review = req.body.review;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        
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
        const filterQuery = `SELECT eventname, note FROM events WHERE uid = $1 AND type = $2 AND favorite = false;`;
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

router.post("/faveFilter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    console.log(filter)
    console.log(req.params)
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        console.log(results)
        const uid = results[0].id;
        const filterQuery = `SELECT eventname, note FROM events WHERE uid = $1 AND type = $2 AND favorite = true;`;
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


    
module.exports = router;