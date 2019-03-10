var express = require('express');
var router = express.Router();
const db = require('../database');

// ================================================================== To Do

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
        const filterQuery = `SELECT placename, note FROM culture WHERE uid = $1 AND type = $2 AND todo = true AND favorite = false;`;
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

// ================================================================== Favorites

router.post('/getCultureFaveList', (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const getFavesQuery = `SELECT placename, note FROM culture WHERE favorite = true AND uid = $1;`;
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

router.post("/faveFilter/:filter", (req, res, next) => {
    const email = req.body.email;
    const filter = req.params.filter
    console.log(filter)
    console.log(req.params)
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results) => {
        console.log(results)
        const uid = results[0].id;
        const filterQuery = `SELECT placename, note FROM culture WHERE uid = $1 AND type = $2 AND favorite = true AND todo = false AND reviewed = false;`
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

// =================================================================== Reviews

router.post("/getCultureReviews", (req,res,next)=>{
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users where email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const selectReviewsQuery = `SELECT placename, review, type, stars from culture WHERE uid = $1 AND reviewed = true;`;
        db.query(selectReviewsQuery,[uid]).then((results2)=>{
            res.json(results2);
        }).catch((error2)=>{
            if(error2){throw error2};
        })
    }).catch((error)=>{
        if(error){throw error}
    })
})

router.post("/addCultureReview/:placename", (req,res,next)=>{
    const email = req.body.email;
    const placename = req.params.placename;
    const type = req.body.type;
    const stars = req.body.stars;
    const review = req.body.review;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery,[email]).then((results)=>{
        const uid = results[0].id;
        const selectPlaceQuery = `SELECT placename FROM culture WHERE uid = $1 AND placename = $2;`;
        db.query(selectPlaceQuery, [uid, placename]).then((results2)=>{
            console.log(results2)
            if(results2.length === 0){
                const insertReviewQuery = `INSERT INTO culture (uid, placename, type, todo, favorite, reviewed, stars, review) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
                db.query(insertReviewQuery,[uid, placename, type, false, false, true, stars, review]).then((results3)=>{
                    const selectReviewsQuery = `SELECT placename, review, stars from culture WHERE uid = $1 AND reviewed = true;`;
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
                const updateCultureQuery = `UPDATE culture SET reviewed = true, review = $1, stars = $2 WHERE uid = $3
                AND placename = $4;`
                db.query(updateCultureQuery,[review, stars, uid,placename]).then((results5)=>{
                    const selectReviewsQuery = `SELECT placename, review, stars from culture WHERE uid = $1 AND reviewed = true;`;
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

router.post("/deleteCultureReview/:placename", (req,res,next)=>{
    const placename = req.params.placename;
    const email = req.body.email;
    const selectUserQuery = `SELECT * FROM users WHERE email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const deleteReviewQuery = `UPDATE culture SET reviewed = false WHERE placename = $1 and  uid = $2;`;
        db.query(deleteReviewQuery,[placename,uid]).then((results2)=>{
            const selectReviewsQuery = `SELECT * FROM culture where reviewed = true AND uid = $1;`;
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
        const getCultureFavoriteQuery = `SELECT placename, type FROM culture WHERE todo = false AND favorite = true AND uid = $1 AND placename = $2;`;
        db.query(getCultureFavoriteQuery,[uid,placename]).then((results2)=>{
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

router.post("/favorites/reviewFave/:placename", (req,res,next)=>{
    const email = req.body.email;
    const placename = req.params.placename;
    const stars = req.body.updatedStars;
    const review = req.body.updatedReview;
    console.log(placename)
    console.log(stars)
    console.log(review)
    const selectUserQuery = `SELECT id from users where email = $1;`;
    db.query(selectUserQuery, [email]).then((results)=>{
        const uid = results[0].id;
        const updateCultureFavoriteQuery = ` UPDATE culture 
        SET stars = $1, review = $2, reviewed = true
        WHERE uid = $3 and placename = $4;`
        db.query(updateCultureFavoriteQuery, [stars,review,uid,placename])
        res.json("YAY IT UPDATED!")
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
            const updateCultureTodoQuery = `UPDATE culture 
            SET placename = $1, type = $2, note = $3
            WHERE uid = $4 AND placename = $5 AND todo = true AND favorite = false AND reviewed = false;`
            db.query(updateCultureTodoQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "favorites"){
            const updateCultureFavoriteQuery = `UPDATE culture 
            SET placename = $1, type = $2, note = $3
            WHERE uid = $4 AND placename = $5 AND todo = false AND favorite = true;`
            db.query(updateCultureFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "reviews"){
            const updateCultureFavoriteQuery = `UPDATE culture 
            SET placename = $1, type = $2, review = $3
            WHERE uid = $4 AND placename = $5 AND reviewed = true;`
            db.query(updateCultureFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }
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
            const getCultureToDoQuery = `SELECT placename, type, note FROM culture WHERE todo = true AND favorite = false AND reviewed = false AND uid = $1 AND placename = $2;`;
            db.query(getCultureToDoQuery, [uid, placename]).then((results2)=>{
                const todoResult = results2[0]
                res.json(todoResult)
            }).catch((error2)=>{
                if(error2){throw error2}
            })
        } else if (section == "favorites"){
            const getCultureFavoriteQuery = `SELECT placename, type, note FROM culture WHERE todo = false AND favorite = true AND uid = $1 AND placename = $2;`;
            db.query(getCultureFavoriteQuery,[uid,placename]).then((results3)=>{
                const favoriteResult = results3[0];
                res.json(favoriteResult)
            }).catch((error3)=>{
                if(error3){throw error3};
            })
        } else if (section == "reviews"){
            const getCultureReviewQuery = `SELECT placename, type, review FROM culture WHERE reviewed = true AND uid = $1 AND placename = $2;`;
            db.query(getCultureReviewQuery,[uid,placename]).then((results3)=>{
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
            const updateCultureTodoQuery = `UPDATE culture 
            SET placename = $1, type = $2, note = $3
            WHERE uid = $4 AND placename = $5 AND todo = true AND favorite = false AND reviewed = false;`
            db.query(updateCultureTodoQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "favorites"){
            const updateCultureFavoriteQuery = `UPDATE culture 
            SET placename = $1, type = $2, note = $3
            WHERE uid = $4 AND placename = $5 AND todo = false AND favorite = true;`
            db.query(updateCultureFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }else if(section == "reviews"){
            const updateCultureFavoriteQuery = `UPDATE culture 
            SET placename = $1, type = $2, review = $3
            WHERE uid = $4 AND placename = $5 AND reviewed = true;`
            db.query(updateCultureFavoriteQuery, [newPlacename, newType, newText, uid, oldPlacename])
            res.json("updated")
        }
    }).catch((error)=>{
        if(error){throw error}
    })

})

module.exports = router;