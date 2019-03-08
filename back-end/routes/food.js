var express = require('express');
var router = express.Router();
const db = require('../database');

router.post('/getFoodList', (req, res, next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        console.log(uid);
        const getFoodToDoQuery = `SELECT placename, note FROM food WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1;`;
        db.query(getFoodToDoQuery,[uid]).then((results2) => {
            res.json(results2)
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
        const getFavesQuery = `SELECT placename, note FROM food WHERE todo = false AND favorite = true AND uid = $1;`;
        db.query(getFavesQuery,[uid]).then((results2) => {
            res.json(results2)
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
        const insertFoodQuery = `INSERT INTO food (uid, placename, type, note, todo, favorite,reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
        db.query(insertFoodQuery, [uid, place, type, note, true, false, false]).then(() => {
            const getFoodToDoQuery = `SELECT placename, note FROM food WHERE todo = true AND uid = $1;`;
            db.query(getFoodToDoQuery, [uid]).then((results2) => {
                res.json(results2)
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
    const place = req.body.placename;
    const type = req.body.type;
    const note = req.body.note;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const insertFoodQuery = `INSERT INTO food (uid, placename, type, note, todo, favorite,reviewed) VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
        db.query(insertFoodQuery, [uid, place, type, note, false, true, false]).then(() => {
            const getFoodToDoQuery = `SELECT placename, note FROM food WHERE favorite = true AND uid = $1;`;
            db.query(getFoodToDoQuery, [uid]).then((results2) => {
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
        todo = true AND favorite = false AND reviewed = false`;
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

router.post("/deleteFavePlace/:placename", (req,res,next)=>{
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
        todo = false AND favorite = true`;
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

router.post("/getFoodReviews", (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const selectReviewsQuery = `SELECT placename, review, stars from food WHERE uid = $1 AND reviewed = true;`;
        db.query(selectReviewsQuery,[uid]).then((results2)=>{
            res.json(results2);
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post("/addFoodReview/:placename", (req,res,next)=>{
    const email = req.body.email;
    const placename = req.params.placename;
    const type = req.body.type;
    const stars = req.body.stars;
    const review = req.body.review;
    console.log(placename)
    console.log(type)
    console.log(stars)
    console.log(review)
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const selectPlaceQuery = `SELECT placename FROM food WHERE uid = $1 AND placename = $2;`;
        db.query(selectPlaceQuery, [uid, placename]).then((results2)=>{
            console.log(results2)
            if(results2.length === 0){
                const insertReviewQuery = `INSERT INTO food (uid, placename, type, todo, favorite, reviewed, stars, review) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
                db.query(insertReviewQuery,[uid, placename, type, false, false, true, stars, review]).then((results3)=>{
                    const selectReviewsQuery = `SELECT placename, review, stars from food WHERE uid = $1 AND reviewed = true;`;
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
                const updateFoodQuery = `UPDATE food SET reviewed = true, review = $1, stars = $2 WHERE uid = $3
                AND placename = $4;`
                db.query(updateFoodQuery,[review, stars, uid,placename]).then((results5)=>{
                    const selectReviewsQuery = `SELECT placename, review, stars from food WHERE uid = $1 AND reviewed = true;`;
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

router.post("/deleteFoodReview/:placename", (req,res,next)=>{
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const deleteReviewQuery = `DELETE FROM food WHERE placename = $1 AND reviewed = true AND uid = $2;`;
        db.query(deleteReviewQuery,[placename,uid]).then((results2)=>{
            const selectReviewsQuery = `SELECT * FROM food where reviewed = true AND uid = $1;`;
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

router.post("/filter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    console.log(filter)
    console.log(req.params)
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        console.log(results)
        const uid = results[0].id;
        const filterQuery = `SELECT placename, note FROM food WHERE uid = $1 AND type = $2 AND favorite = false;`;
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
        const filterQuery = `SELECT placename, note FROM food WHERE uid = $1 AND type = $2 AND favorite = true;`;
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