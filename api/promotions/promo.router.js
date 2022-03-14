const {getAllPromos} = require("./promo.controller");
const router = require("express").Router();

router.get("/",getAllPromos);
module.exports = router;