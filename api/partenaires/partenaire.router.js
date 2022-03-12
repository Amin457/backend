const { createConfig,getPartenaires} = require("./partenaire.controller");
const router = require("express").Router();

router.post("/",createConfig);
router.get("/",getPartenaires);
/*router.get("/:id",getUserByUserId);
router.delete("/:id",deleteUser);
router.post("/login",login);*/


module.exports = router;