const {getPartConfig,getPartenaires} = require("./partenaire.controller");
const router = require("express").Router();

/*router.post("/",createConfig);*/
router.get("/",getPartenaires);
router.get("/getConfig/:id_part",getPartConfig);




module.exports = router;