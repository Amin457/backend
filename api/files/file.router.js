const router = require("express").Router();
const controller = require("./file.controller");

  router.post("/upload", controller.upload);
  router.get("/get/:name", controller.getFile);
  router.post("/notif", controller.notification);


module.exports = router;