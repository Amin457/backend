const {nbrFeedback,statReponse} = require("./statFeed.controller");
const router = require("express").Router();

router.post("/nbrFeedback",nbrFeedback);
router.post("/statReponse",statReponse);

module.exports = router;