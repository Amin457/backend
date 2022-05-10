const router = require("express").Router();
const controller = require("./notification.controller");

 
  router.post("/notif", controller.notification);
  router.get("/nbrNotif/:id_client", controller.getNbr);
  router.get("/getAllNotif/:id_client",controller.getAllNotif);


module.exports = router;