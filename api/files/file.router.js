const router = require("express").Router();
const controller = require("./file.controller");

  router.post("/upload", controller.upload);
  router.get("/get/:name", controller.getFile);

module.exports = router;