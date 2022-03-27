const multer = require("multer");
const util = require("util");
const path = require("path");
const uuid = require("uuid");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = path.parse(file.originalname).name.replace(/\s/g, '');
      const extension = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`)
  }
})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;