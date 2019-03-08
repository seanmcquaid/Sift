var express = require('express');
var router = express.Router();
const db = require('../database');


router.post('/getActiveList', (req, res, next) => {
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        console.log(uid);
        const getActiveToDoQuery = `SELECT placename, note FROM active WHERE todo = true AND favorite = false AND uid = $1;`;
        db.query(getActiveToDoQuery, [uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post('/getActiveFaveList', (req, res, next) => {
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const getFavesQuery = `SELECT placename, note FROM active WHERE todo = false AND favorite = true AND uid = $1;`;
        db.query(getFavesQuery, [uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post('/addActive', (req, res, next) => {
    console.log(req.body)
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
            const getActiveToDoQuery = `SELECT placename, note FROM active WHERE todo = true AND favorite = false AND uid = $1;`;
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

router.post('/addFaveInFavorites', (req, res, next) => {
    const activity = req.body.activity;
    const type = req.body.type;
    const note = req.body.note;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const insertActiveFaveQuery = `INSERT INTO active (uid, placename, type, note, todo, favorite, reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
        db.query(insertActiveFaveQuery, [uid, activity, type, note, false, true, false]).then(() => {
            const getActiveFaveQuery = `SELECT placename, note FROM active WHERE favorite = true AND uid = $1;`;
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
            todo = true AND favorite = false;`;
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
    console.log(req.body.email)
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id
        const deleteActiveQuery = `DELETE FROM active where placename = $1 and uid = $2;`;
        db.query(deleteActiveQuery, [activity, uid]).then((results) => {
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectActiveToDoQuery = `SELECT placename, note FROM active WHERE uid =$1 AND 
        todo = true AND favorite = false`;
        db.query(selectActiveToDoQuery, [uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 };
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post("/deleteFavePlace/:activity", (req, res, next) => {
    const activity = req.params.activity;
    const email = req.body.email;
    console.log(req.body.email)
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id
        const deleteActiveQuery = `DELETE FROM active where placename = $1 and uid = $2;`;
        db.query(deleteActiveQuery, [activity, uid]).then((results) => {
            console.log(results)
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectActiveToDoQuery = `SELECT placename, note FROM active WHERE uid =$1 AND 
        todo = false AND favorite = true`;
        db.query(selectActiveToDoQuery, [uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 };
        })
    }).catch((error) => {
        if (error) { throw error };
    })
})

router.post("/getActiveReviews", (req, res, next) => {
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const selectReviewsQuery = `SELECT placename, review, stars from active WHERE uid = $1 AND reviewed = true;`;
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
            console.log(results2)
            if (results2.length === 0) {
                const insertReviewQuery = `INSERT INTO active (uid, placename, type, todo, favorite, reviewed, stars, review) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
                db.query(insertReviewQuery, [uid, activity, type, false, false, true, stars, review]).then((results3) => {
                    const selectReviewsQuery = `SELECT placename, review, stars FROM activr WHERE uid = $1 AND reviewed = true;`;
                    db.query(selectReviewsQuery, [uid]).then((results4) => {
                        // console.log(results4);
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
                db.query(updateActiveQuery, [review, stars, uid, activity]).then((results5) => {
                    const selectReviewsQuery = `SELECT placename, review, stars from active WHERE uid = $1 AND reviewed = true;`;
                    db.query(selectReviewsQuery, [uid]).then((results6) => {
                        // console.log(results6);
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

router.post("/filter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    console.log(filter)
    console.log(req.params)
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        console.log(results)
        const uid = results[0].id;
        const filterQuery = `SELECT placename, note FROM active WHERE uid = $1 AND type = $2 AND favorite = false;`;
        db.query(filterQuery, [uid, filter]).then((results2) => {
            console.log(results2)
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error }
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
        const filterQuery = `SELECT placename, note FROM active WHERE uid = $1 AND type = $2 AND favorite = true;`;
        db.query(filterQuery, [uid, filter]).then((results2) => {
            console.log(results2)
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error) => {
        if (error) { throw error }
    })
})



module.exports = router;