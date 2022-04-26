const { createUser,deleteUser,login , getUserByUserId,getUsers,updateUsers,registerNotif} = require("./user.controller");
const router = require("express").Router();

router.post("/",createUser);
router.get("/",getUsers);
router.get("/:id",getUserByUserId);
router.delete("/:id",deleteUser);
router.post("/login",login);
router.patch("/",updateUsers);
router.post("/registerNotif",registerNotif);



module.exports = router;