var express = require('express');
var router = express.Router();
const db = require('../database');

// ================================================================ middleware for checking for duplicates

router.use((req, res, next) => {
    if ((req.body.email) && (req.body.placename)) {
        const selectUserQuery = `SELECT id from users where email = $1;`;
        db.query(selectUserQuery, [req.body.email]).then((results) => {
            res.locals.uid = results[0].id;
            const compareQuery = `SELECT placename from food WHERE uid = $1 AND placename = $2 AND reviewed = false;`;
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

// ================================================================================================ To Do

router.post('/getFoodList', (req, res, next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const getFoodToDoQuery = `SELECT placename, note, type FROM food WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1 ORDER BY id DESC;`;
        db.query(getFoodToDoQuery,[uid]).then((results2) => {
            res.json(results2)
        }).catch((error2) => {
            if (error2) { throw error2 }
        })
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.post('/addFood', (req, res, next)=>{
    const place = req.body.placename;
    const type = req.body.type;
    const note = req.body.note;
    const email = req.body.email;
    const insertFoodQuery = `INSERT INTO food (uid, placename, type, note, todo, favorite, reviewed) VALUES
    ($1, $2, $3, $4, $5, $6, $7);`;
    db.query(insertFoodQuery, [res.locals.uid, place, type, note, true, false, false]).then((insertResults) => {
        const getFoodToDoQuery = `SELECT placename, note, type FROM food WHERE todo = true AND uid = $1 ORDER BY id DESC;`;
        db.query(getFoodToDoQuery, [res.locals.uid]).then((results2) => {
            res.json(results2)
        })
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
            const selectFoodToDoQuery = ` SELECT placename, note, type FROM food WHERE uid =$1 AND 
            todo = true AND favorite = false ORDER BY id DESC;`;
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

// EDIT FOR ALL SECTIONs
router.post('/:section/getPlaceToEdit/:placename',(req, res, next)=>{
    const section = req.params.section;
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        if(section == "todo"){
            const getFoodToDoQuery = `SELECT placename, type, note FROM food WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1 AND placename = $2 ORDER BY id DESC;`;
            db.query(getFoodToDoQuery, [uid, placename]).then((results2)=>{
                const todoResult = results2[0]
                res.json(todoResult)
            }).catch((error2)=>{
                if(error2){throw error2}
            })
        } else if (section == "favorites"){
            const getFoodFavoriteQuery = `SELECT placename, type, note FROM food WHERE todo = false AND favorite = true AND uid = $1 AND placename = $2 ORDER BY id DESC;`;
            db.query(getFoodFavoriteQuery,[uid,placename]).then((results3)=>{
                const favoriteResult = results3[0];
                res.json(favoriteResult)
            }).catch((error3)=>{
                if(error3){throw error3};
            })
        } else if (section == "reviews"){
            const getFoodReviewQuery = `SELECT placename, type, review FROM food WHERE reviewed = true AND uid = $1 AND placename = $2 ORDER BY id DESC;`;
            db.query(getFoodReviewQuery,[uid,placename]).then((results3)=>{
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
            const updateFoodTodoQuery = `UPDATE food 
            SET placename = $1, type = $2, note = $3
            WHERE uid = $4 AND placename = $5 AND todo = true AND favorite = false AND reviewed = false;`
            db.query(updateFoodTodoQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "favorites"){
            const updateFoodFavoriteQuery = `UPDATE food 
            SET placename = $1, type = $2, note = $3
            WHERE uid = $4 AND placename = $5 AND todo = false AND favorite = true;`
            db.query(updateFoodFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "reviews"){
            const updateFoodFavoriteQuery = `UPDATE food 
            SET placename = $1, type = $2, review = $3
            WHERE uid = $4 AND placename = $5 AND reviewed = true;`
            db.query(updateFoodFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post("/deletePlace/:placename", (req,res,next)=>{
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id
        const deletePlaceQuery = `DELETE FROM food where placename = $1 and uid = $2;`;
        db.query(deletePlaceQuery, [placename, uid]).then((results)=>{
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectFoodToDoQuery = `SELECT placename, note FROM food WHERE uid =$1 AND 
        todo = true AND favorite = false AND reviewed = false ORDER BY id DESC`;
        db.query(selectFoodToDoQuery, [uid]).then((results2)=>{
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
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const filterQuery = `SELECT placename, note, type FROM food WHERE uid = $1 AND type = $2 AND todo = true AND favorite = false ORDER BY id DESC;`;
        db.query(filterQuery, [uid, filter]).then((results2) => {
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2}
        })
    }).catch((error) => {
        if (error) {throw error}
    })    
})

// ================================================================================================ Favorites

router.post('/getFoodFaveList', (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const getFavesQuery = `SELECT placename, note,type FROM food WHERE todo = false AND favorite = true AND uid = $1 ORDER BY id DESC;`;
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
            const getFoodToDoQuery = `SELECT placename, note,type FROM food WHERE favorite = true AND uid = $1 ORDER BY id DESC;`;
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

router.post("/deleteFavePlace/:placename", (req,res,next)=>{
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id
        const deletePlaceQuery = `DELETE FROM food where placename = $1 and uid = $2;`;
        db.query(deletePlaceQuery, [placename, uid]).then((results)=>{
        }).catch((error) => {
            if (error) { throw error };
        })
        const selectFoodToDoQuery = `SELECT placename, note, type FROM food WHERE uid =$1 AND 
        todo = false AND favorite = true ORDER BY id DESC`;
        db.query(selectFoodToDoQuery, [uid]).then((results2)=>{
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
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        const uid = results[0].id;
        const filterQuery = `SELECT placename, note, type FROM food WHERE uid = $1 AND type = $2 AND favorite = true AND todo = false AND reviewed = false ORDER BY id DESC;`;
        db.query(filterQuery, [uid, filter]).then((results2) => {
            res.json(results2)
        }).catch((error2)=>{
            if(error2){throw error2}
        })
    }).catch((error) => {
        if (error) {throw error}
    })    
})

// ================================================================================================ Reviews

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
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const selectPlaceQuery = `SELECT placename FROM food WHERE uid = $1 AND placename = $2;`;
        db.query(selectPlaceQuery, [uid, placename]).then((results2)=>{
            if(results2.length === 0){
                const insertReviewQuery = `INSERT INTO food (uid, placename, type, todo, favorite, reviewed, stars, review) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
                db.query(insertReviewQuery,[uid, placename, type, false, false, true, stars, review]).then((results3)=>{
                    const selectReviewsQuery = `SELECT placename, review, stars from food WHERE uid = $1 AND reviewed = true;`;
                    db.query(selectReviewsQuery,[uid]).then((results4)=>{
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
        const deleteReviewQuery = `UPDATE food SET reviewed = false WHERE placename = $1 and  uid = $2;`;
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

router.post('/:section/getFaveToReview/:placename',(req, res, next)=>{
    const section = req.params.section;
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
                const getFoodFavoriteQuery = `SELECT placename, type FROM food WHERE todo = false AND favorite = true AND uid = $1 AND placename = $2;`;
                db.query(getFoodFavoriteQuery,[uid,placename]).then((results2)=>{
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
        const updateFoodFavoriteQuery = ` UPDATE food 
        SET stars = $1, review = $2, reviewed = true
        WHERE uid = $3 and placename = $4;`
        db.query(updateFoodFavoriteQuery, [stars,review,uid,placename])
        res.json("YAY IT UPDATED!")
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
        const insertExploreTodoQuery = `INSERT INTO food (uid, placename, type, note, todo, favorite, reviewed, location)
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
        const insertExploreFavoriteQuery = `INSERT INTO food (uid, placename, type, note, todo, favorite, reviewed, location)
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