const router = require("express").Router();
const controller = require("./file.controller");

  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/get/:name", controller.getFile);
  router.get("/download/:name" , controller.download)

module.exports = router;