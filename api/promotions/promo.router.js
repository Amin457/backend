const {getAllPromos,getPromoByPart,create} = require("./promo.controller");
const router = require("express").Router();

router.get("/",getAllPromos);
router.get("/:id",getPromoByPart);
router.post("/", create);
module.exports = router;