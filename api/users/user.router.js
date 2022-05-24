const { createUser,login , getUserByUserId,updateUsers,registerNotif,deleteToken} = require("./user.controller");
const router = require("express").Router();

router.post("/",createUser);
router.get("/:id",getUserByUserId);
router.post("/login",login);
router.patch("/",updateUsers);
router.post("/registerNotif",registerNotif);
router.delete("/deleteToken/:id",deleteToken);


module.exports = router;