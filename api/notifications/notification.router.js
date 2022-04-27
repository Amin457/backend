const router = require("express").Router();
const controller = require("./notification.controller");

 
  router.post("/notif", controller.notification);


module.exports = router;