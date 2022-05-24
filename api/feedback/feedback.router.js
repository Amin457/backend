const {createFeed,getAllQuest,insertQuestion,insertReponse,getReponse,getFeed} = require("./feedback.controller");
const router = require("express").Router();

router.put("/",createFeed);
router.get("/question/:id_part",getAllQuest);
/////
router.post("/question/insertQuestion",insertQuestion);
router.post("/question/insertReponse",insertReponse);
router.get("/question/getReponse/:id_question",getReponse);
router.get("/getFeed/:id_part",getFeed);




module.exports = router;