var express = require('express');
var router = express.Router();
const db = require('../database');

// ===================================================================== To Do

router.post('/getEventList', (req, res, next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        console.log(uid);
        const getEventToDoQuery = `SELECT eventname, readabledate, note FROM events WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1 ORDER BY date DESC NULLS LAST;`;
        db.query(getEventToDoQuery,[uid]).then((results2) => {
            res.json(results2)
            console.log(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/addEvent', (req, res, next)=>{
    console.log(req.body)
    const eventname = req.body.eventname;
    const type = req.body.type;
    const readabledate = req.body.readabledate;
    const date = req.body.date;
    const note = req.body.note;
    const email = req.body.email;
    console.log(date, readabledate)
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        // console.log(results)
        const uid = results[0].id;
        const insertEventQuery = `INSERT INTO events (uid, eventname, type, date, note, todo, favorite, reviewed, readabledate) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        db.query(insertEventQuery, [uid, eventname, type, date, note, true, false, false, readabledate]).then(() => {
            const getEventQuery = `SELECT eventname, readabledate, note FROM events WHERE todo = true AND uid = $1 ORDER BY date DESC NULLS LAST;`;
            db.query(getEventQuery, [uid]).then((results2) => {
                res.json(results2)
                // console.log(results2)
            }).catch((error3) => {
                if (error3) { throw error3 }
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
        AND eventname = $2 ;`
        db.query(updateQuery, [uid, eventname]).then((results)=>{
            const selectEventToDoQuery = ` SELECT eventname, readabledate, note FROM events WHERE uid =$1 AND 
            todo = true AND favorite = false ORDER BY date DESC NULLS LAST;`;
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
        const selectEventToDoQuery = `SELECT eventname, readabledate, note FROM events WHERE uid =$1 AND 
        todo = true AND favorite = false ORDER BY date DESC NULLS LAST;`;
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

router.post("/filter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    console.log(filter)
    console.log(req.params)
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        console.log(results)
        const uid = results[0].id;

        const filterQuery = `SELECT eventname, readabledate, note FROM events WHERE uid = $1 AND type = $2 AND todo = true AND favorite = false ORDER BY date DESC NULLS LAST;`;

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

// ===================================================================== Favorites

router.post('/getEventFaveList', (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const getFavesQuery = `SELECT eventname, readabledate, note FROM events WHERE todo = false AND favorite = true AND uid = $1 ORDER BY date DESC NULLS LAST;`;
        db.query(getFavesQuery,[uid]).then((results2) => {
            res.json(results2)
            console.log(results2)
        }).catch((error2) => {



            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/addFaveInFavorites', (req, res, next)=>{
    console.log(req.body)
    const eventname = req.body.eventname;
    const type = req.body.type;
    const date = req.body.date;
    console.log(date)
    const note = req.body.note;
    const email = req.body.email;
    const readabledate = req.body.readabledate;
    // console.log(place, type)
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        // console.log(results)
        const uid = results[0].id;
        const insertEventQuery = `INSERT INTO events (uid, eventname, type, date, note, todo, favorite, reviewed, readabledate) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        db.query(insertEventQuery, [uid, eventname, type, date, note, false, true, false, readabledate]).then(() => {
            const getEventQuery = `SELECT eventname, readabledate, note FROM events WHERE favorite = true AND uid = $1 ORDER BY date DESC NULLS LAST;`;
            db.query(getEventQuery, [uid]).then((results2) => {
                res.json(results2)
                // console.log(results2)
            }).catch((error3)=>{
                if (errors){throw error3}
            })
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})



router.post("/deleteFaveEvent/:eventname", (req,res,next)=>{
    const eventname = req.params.eventname;
    const email = req.body.email;
    // console.log(req.body.email)
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
        const selectEventToDoQuery = `SELECT eventname, readabledate, note FROM events WHERE uid =$1 AND 
        todo = false AND favorite = true ORDER BY date DESC NULLS LAST`;
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

router.post("/faveFilter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    console.log(filter)
    console.log(req.params)
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        console.log(results)
        const uid = results[0].id;
        const filterQuery = `SELECT eventname, readabledate, note FROM events WHERE uid = $1 AND type = $2 AND favorite = true AND todo = false AND reviewed = false ORDER BY date DESC NULLS LAST;`;
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


// ==================================================================== Reviews

router.post("/getEventReviews", (req,res,next)=>{
    const email = req.body.email;
    console.log(req.body.date)
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const selectReviewsQuery = `SELECT eventname, type, readabledate, stars, review from events WHERE uid = $1 AND reviewed = true ORDER BY date DESC NULLS LAST;`;
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
    console.log(req.body)
    
    const email = req.body.email;
    const eventname = req.params.eventname;
    const type = req.body.type;
    const date = req.body.date
    const readabledate = req.body.readabledate
    // console.log(req.body.date,req.body.type)
    const stars = req.body.stars;
    const review = req.body.review;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const selectEventQuery = `SELECT eventname FROM events WHERE uid = $1 AND eventname = $2;`;
        db.query(selectEventQuery, [uid, eventname]).then((results2)=>{
            console.log(results2)
            if(results2.length === 0){
                const insertReviewQuery = `INSERT INTO events (uid, eventname, type, date, todo, favorite, reviewed, stars, review, readabledate) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`
                db.query(insertReviewQuery,[uid, eventname, type, date, false, false, true, stars, review, readabledate]).then((results3)=>{
                    const selectReviewsQuery = `SELECT eventname, type, review, readabledate, stars from events WHERE uid = $1 AND reviewed = true ORDER BY date DESC NULLS LAST;`;
                    db.query(selectReviewsQuery,[uid]).then((results4)=>{
                        // console.log(results4);
                        res.json(results4);
                    }).catch((error4)=>{
                        if(error4){throw error4};
                    })
                }).catch((error3)=>{
                    if(error3){throw error3};
                })
            } else {
                const updateEventQuery = `UPDATE events SET reviewed = true, review = $1, stars = $2 WHERE uid = $3
                AND eventname = $4;`
                db.query(updateEventQuery,[review, stars, uid,eventname]).then((results5)=>{
                    const selectReviewsQuery = `SELECT eventname, type, review, readabledate, stars from events WHERE uid = $1 AND reviewed = true ORDER BY date DESC NULLS LAST;`;
                    db.query(selectReviewsQuery,[uid]).then((results6)=>{
                        // console.log(results6);
                        res.json(results6);
                    }).catch((error6)=>{
                        if(error6){throw error6};
                    })
                }).catch((error5)=>{
                    if(error5){throw error5}
                })
            }
        }).catch((error2)=>{
            if(error2){throw error2}
        })
        
    }).catch((error)=>{
        if(error){throw error};
    })

})

router.post("/deleteEventReview/:eventname", (req,res,next)=>{
    const eventname = req.params.eventname;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const deleteReviewQuery = `UPDATE events SET reviewed = false WHERE eventname = $1 and  uid = $2;`;
        db.query(deleteReviewQuery,[eventname,uid]).then((results2)=>{
            const selectReviewsQuery = `SELECT * FROM events where reviewed = true AND uid = $1 ORDER BY date DESC NULLS LAST;`;
            db.query(selectReviewsQuery, [uid]).then((results3)=>{
                res.json(results3)
            }).catch((error3)=>{
                if(error3){throw error3};
            })
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/:section/getFaveToReview/:eventname',(req, res, next)=>{
    const section = req.params.section;
    const eventname = req.params.eventname;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
                const getEventFavoriteQuery = `SELECT eventname, type, readabledate FROM events WHERE todo = false AND favorite = true AND uid = $1 AND eventname = $2 ORDER BY date DESC NULLS LAST;`;
                db.query(getEventFavoriteQuery,[uid,eventname]).then((results2)=>{
                    const favoriteResult = results2[0];
                    console.log(favoriteResult)
                    res.json(favoriteResult)
                }).catch((error2)=>{
                    if(error2){throw error2};
                })
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post("/:section/reviewFave/:eventname", (req,res,next)=>{
    const email = req.body.email;
    const eventname = req.params.eventname;
    const stars = req.body.updatedStars;
    const review = req.body.updatedReview;
    console.log(eventname)
    console.log(stars)
    console.log(review)
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const updateFoodFavoriteQuery = ` UPDATE events
        SET stars = $1, review = $2, reviewed = true
        WHERE uid = $3 and eventname = $4;`
        db.query(updateFoodFavoriteQuery, [stars,review,uid,eventname])
        res.json("YAY IT UPDATED!")
    }).catch((error)=>{
        if(error){throw error}
    })
})
    
router.post('/:section/getPlaceToEdit/:placename',(req, res, next)=>{
    const section = req.params.section;
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        if(section == "todo"){
            const getEventToDoQuery = `SELECT eventname, type, note, FROM events WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1 AND eventname = $2;`;
            db.query(getEventToDoQuery, [uid, placename]).then((results2)=>{
                const todoResult = results2[0]
                res.json(todoResult)
            }).catch((error2)=>{
                if(error2){throw error2}
            })
        } else if (section == "favorites"){
            const getEventFavoriteQuery = `SELECT eventname, type, note, FROM events WHERE todo = false AND favorite = true AND uid = $1 AND eventname = $2;`;
            db.query(getEventFavoriteQuery,[uid,placename]).then((results3)=>{
                const favoriteResult = results3[0];
                res.json(favoriteResult)
            }).catch((error3)=>{
                if(error3){throw error3};
            })
        } else if (section == "reviews"){
            const getEventReviewQuery = `SELECT eventname, type, review, FROM events WHERE reviewed = true AND uid = $1 AND eventname = $2;`;
            db.query(getEventReviewQuery,[uid,placename]).then((results3)=>{
                const reviewResult = results3[0];
                res.json(reviewResult)
            }).catch((error3)=>{
                if(error3){throw error3};
            })
        }
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post("/:section/editPlace/:placename", (req,res,next)=>{
    const email = req.body.email;
    const section = req.params.section;
    // console.log(section)
    const oldPlacename = req.params.placename;
    const newPlacename = req.body.updatedPlacename;
    const newType = req.body.updatedType;
    const newText = req.body.updatedText;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        if(section == "todo"){
            const updateEventTodoQuery = `UPDATE events
            SET eventname = $1, type = $2, note = $3
            WHERE uid = $4 AND eventname = $5 AND todo = true AND favorite = false AND reviewed = false;`
            db.query(updateEventTodoQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "favorites"){
            const updateEventFavoriteQuery = `UPDATE events 
            SET eventname = $1, type = $2, note = $3
            WHERE uid = $4 AND eventname = $5 AND todo = false AND favorite = true;`
            db.query(updateEventFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "reviews"){
            const updateEventFavoriteQuery = `UPDATE events 
            SET eventname = $1, type = $2, review = $3
            WHERE uid = $4 AND eventname = $5 AND reviewed = true;`
            db.query(updateEventFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }
    }).catch((error)=>{
        if(error){throw error}
    })

})
    
module.exports = router;