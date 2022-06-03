const {getAllPromos,getPromoByPart,create,deletepromo,getPromoById,updatePromo} = require("./promo.controller");
const router = require("express").Router();

router.get("/",getAllPromos);
router.get("/:id",getPromoByPart);
router.post("/",create);
router.delete("/:id",deletepromo);
router.get("/getPromoById/:id",getPromoById);
router.patch("/updatePromo",updatePromo);
module.exports = router;