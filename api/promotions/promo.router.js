const {getAllPromos,getPromoByPart} = require("./promo.controller");
const router = require("express").Router();

router.get("/",getAllPromos);
router.get("/:id",getPromoByPart);
module.exports = router;