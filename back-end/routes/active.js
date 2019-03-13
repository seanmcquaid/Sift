var express = require('express');
var router = express.Router();
const db = require('../database');

// ================================================================ middleware for checking for duplicates

router.use((req, res, next) => {
    if ((req.body.email) && (req.body.placename)) {
        const selectUserQuery = `SELECT id from users where email = $1;`;
        db.query(selectUserQuery, [req.body.email]).then((results) => {
            res.locals.uid = results[0].id;
            const compareQuery = `SELECT placename from active WHERE uid = $1 AND placename = $2 AND reviewed = false;`;
            db.query(compareQuery, [res.locals.uid, req.body.placename]).then((compareResults) => {
                if (compareResults.length > 0) {
                    res.json([])
                } else {
                    next();
                }
            })
        })
    } else {
        next();
    }
})

// ================================================ To Do


router.post('/getActiveList', (req, res, next) => {
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const getActiveToDoQuery = `SELECT placename, note FROM active WHERE todo = true AND favorite = false AND uid = $1 ORDER BY id DESC;`;
        db.query(getActiveToDoQuery, [uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post('/addActive', (req, res, next) => {
    const activity = req.body.placename;
    const type = req.body.type;
    const note = req.body.note;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const insertActiveQuery = `INSERT INTO active (uid, placename, type, note, todo, favorite, reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
        db.query(insertActiveQuery, [uid, activity, type, note, true, false, false]).then(() => {
            const getActiveToDoQuery = `SELECT placename, note FROM active WHERE todo = true AND favorite = false AND uid = $1 ORDER BY id DESC;`;
            db.query(getActiveToDoQuery, [uid]).then((results2) => {
                res.json(results2)
            })
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post('/addFave/:activity', (req, res, next) => {
    const activity = req.params.activity;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id
        const updateQuery = `UPDATE active SET todo = false, favorite = true WHERE uid = $1
        AND placename = $2;`
        db.query(updateQuery, [uid, activity]).then((results) => {
            const selectActiveToDoQuery = ` SELECT placename, note FROM active WHERE uid =$1 AND 
            todo = true AND favorite = false ORDER BY id DESC;`;
            db.query(selectActiveToDoQuery, [uid]).then((results2) => {
                res.json(results2)
            }).catch((error2) => {
                if (error2) { throw error2 };
            })
        }).catch((error) => {
            if (error) { throw error };
        })
    })
})

router.post("/deleteActive/:activity", (req, res, next) => {
    const activity = req.params.activity;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id
        const deleteActiveQuery = `DELETE FROM active where placename = $1 and uid = $2;`;
        db.query(deleteActiveQuery, [activity, uid]).then((results) => {
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectActiveToDoQuery = `SELECT placename, note FROM active WHERE uid =$1 AND 
        todo = true AND favorite = false ORDER BY id DESC`;
        db.query(selectActiveToDoQuery, [uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 };
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post("/filter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const filterQuery = `SELECT placename, note FROM active WHERE uid = $1 AND type = $2 AND todo = true AND favorite = false ORDER BY id DESC;`;
        db.query(filterQuery, [uid, filter]).then((results2) => {
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2}
        })
    }).catch((error) => {
        if (error) {throw error}
    })    
})


// ================================================ Favorites

router.post('/getActiveFaveList', (req, res, next) => {
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const getFavesQuery = `SELECT placename, note FROM active WHERE todo = false AND favorite = true AND uid = $1 ORDER BY id DESC;`;
        db.query(getFavesQuery, [uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})


router.post('/addFaveInFavorites', (req, res, next) => {
    const placename = req.body.placename;
    const type = req.body.type;
    const note = req.body.note;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const insertActiveFaveQuery = `INSERT INTO active (uid, placename, type, note, todo, favorite, reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
        db.query(insertActiveFaveQuery, [uid, placename, type, note, false, true, false]).then(() => {
            const getActiveFaveQuery = `SELECT placename, note FROM active WHERE favorite = true AND uid = $1 ORDER BY id DESC;`;
            db.query(getActiveFaveQuery, [uid]).then((results2) => {
                res.json(results2)
            })
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post("/deleteFavePlace/:activity", (req, res, next) => {
    const activity = req.params.activity;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id
        const deleteActiveQuery = `DELETE FROM active where placename = $1 and uid = $2;`;
        db.query(deleteActiveQuery, [activity, uid]).then((results) => {
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectActiveToDoQuery = `SELECT placename, note FROM active WHERE uid =$1 AND 
        todo = false AND favorite = true ORDER BY id DESC`;
        db.query(selectActiveToDoQuery, [uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 };
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post("/faveFilter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const filterQuery = `SELECT placename, note FROM active WHERE uid = $1 AND type = $2 AND favorite = true AND todo = false AND reviewed = false ORDER BY id DESC;`
        db.query(filterQuery, [uid, filter]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error }
    })
})


// ================================================ Reviews

router.post("/getActiveReviews", (req, res, next) => {
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const selectReviewsQuery = `SELECT placename, review, type, stars from active WHERE uid = $1 AND reviewed = true ORDER BY id DESC;`;
        db.query(selectReviewsQuery, [uid]).then((results2) => {
            res.json(results2);
        }).catch((error2) => {
            if (error2) { throw error2 };
        })
    }).catch((error) => {
        if (error) { throw error }
    })
})

router.post("/addActiveReview/:activity", (req, res, next) => {
    const email = req.body.email;
    const activity = req.params.activity;
    const type = req.body.type;
    const stars = req.body.stars;
    const review = req.body.review;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const selectActiveQuery = `SELECT placename FROM active WHERE uid = $1 AND placename = $2;`;
        db.query(selectActiveQuery, [uid, activity]).then((results2) => {
            if (results2.length === 0) {
                const insertReviewQuery = `INSERT INTO active (uid, placename, type, todo, favorite, reviewed, stars, review) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
                db.query(insertReviewQuery, [uid, activity, type, false, false, true, stars, review]).then((results3) => {
                    const selectReviewsQuery = `SELECT placename, review, stars FROM active WHERE uid = $1 AND reviewed = true;`;
                    db.query(selectReviewsQuery, [uid]).then((results4) => {
                        res.json(results4);
                    }).catch((error4) => {
                        if (error4) { throw error4 };
                    })
                }).catch((error3) => {
                    if (error3) { throw error3 };
                })
            } else {
                const updateActiveQuery = `UPDATE active SET reviewed = true, review = $1, stars = $2 WHERE uid = $3
                AND placename = $4;`
                db.query(updateActiveQuery, [review, stars, uid, placename]).then((results5) => {
                    const selectReviewsQuery = `SELECT placename, review, stars from active WHERE uid = $1 AND reviewed = true;`;
                    db.query(selectReviewsQuery, [uid]).then((results6) => {
                        res.json(results6);
                    }).catch((error6) => {
                        if (error6) { throw error6 };
                    })
                }).catch((error5) => {
                    if (error5) { throw error5 }
                })
            }
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error };
    })

})

router.post("/deleteActiveReview/:placename", (req,res,next)=>{
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const deleteReviewQuery = `UPDATE active SET reviewed = false WHERE placename = $1 and  uid = $2;`;
        db.query(deleteReviewQuery,[placename,uid]).then((results2)=>{
            const selectReviewsQuery = `SELECT placename, review, type, stars from active WHERE uid = $1 AND reviewed = true;`;
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

router.post('/:section/getFaveToReview/:placename',(req, res, next)=>{
    const section = req.params.section;
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
                const getActiveFavoriteQuery = `SELECT placename, type FROM active WHERE todo = false AND favorite = true AND uid = $1 AND placename = $2;`;
                db.query(getActiveFavoriteQuery,[uid,placename]).then((results2)=>{
                    const favoriteResult = results2[0];
                    res.json(favoriteResult)
                }).catch((error2)=>{
                    if(error2){throw error2};
                })
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post("/favorites/reviewFave/:placename", (req,res,next)=>{
    const email = req.body.email;
    const placename = req.params.placename;
    const stars = req.body.updatedStars;
    const review = req.body.updatedReview;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const updateActiveFavoriteQuery = ` UPDATE active 
        SET stars = $1, review = $2, reviewed = true
        WHERE uid = $3 and placename = $4;`
        db.query(updateActiveFavoriteQuery, [stars,review,uid,placename])
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
            const getActiveToDoQuery = `SELECT placename, type, note FROM active WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1 AND placename = $2;`;
            db.query(getActiveToDoQuery, [uid, placename]).then((results2)=>{
                const todoResult = results2[0]
                res.json(todoResult)
            }).catch((error2)=>{
                if(error2){throw error2}
            })
        } else if (section == "favorites"){
            const getActiveFavoriteQuery = `SELECT placename, type, note FROM active WHERE todo = false AND favorite = true AND uid = $1 AND placename = $2;`;
            db.query(getActiveFavoriteQuery,[uid,placename]).then((results3)=>{
                const favoriteResult = results3[0];
                res.json(favoriteResult)
            }).catch((error3)=>{
                if(error3){throw error3};
            })
        } else if (section == "reviews"){
            const getActiveReviewQuery = `SELECT placename, type, review FROM active WHERE reviewed = true AND uid = $1 AND placename = $2;`;
            db.query(getActiveReviewQuery,[uid,placename]).then((results3)=>{
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
    const oldPlacename = req.params.placename;
    const newPlacename = req.body.updatedPlacename;
    const newType = req.body.updatedType;
    const newText = req.body.updatedText;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        if(section == "todo"){
            const updateActiveTodoQuery = `UPDATE active 
            SET placename = $1, type = $2, note = $3
            WHERE uid = $4 AND placename = $5 AND todo = true AND favorite = false AND reviewed = false;`
            db.query(updateActiveTodoQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "favorites"){
            const updateActiveFavoriteQuery = `UPDATE active 
            SET placename = $1, type = $2, note = $3
            WHERE uid = $4 AND placename = $5 AND todo = false AND favorite = true;`
            db.query(updateActiveFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "reviews"){
            const updateActiveFavoriteQuery = `UPDATE active 
            SET placename = $1, type = $2, review = $3
            WHERE uid = $4 AND placename = $5 AND reviewed = true;`
            db.query(updateActiveFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post("/addExploreTodo", (req,res,next)=>{
    const placename = req.body.place;
    const type = req.body.type;
    const note = req.body.text;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const insertExploreTodoQuery = `INSERT INTO active (uid, placename, type, note, todo, favorite, reviewed, location)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8);
        `
        db.query(insertExploreTodoQuery,[uid,placename,type, note,true,false,false,note])
        res.json({
            msg : "added"
        })
    }).catch((error)=>{
        if(error){throw error}
    })
})


router.post("/addExploreFavorite", (req,res,next)=>{
    const placename = req.body.place;
    const type = req.body.type;
    const note = req.body.text;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const insertExploreFavoriteQuery = `INSERT INTO active (uid, placename, type, note, todo, favorite, reviewed, location)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8);
        `
        db.query(insertExploreFavoriteQuery,[uid,placename,type, note,false,true,false,note])
        res.json({
            msg : "added"
        })
    }).catch((error)=>{
        if(error){throw error}
    })
})

module.exports = router;