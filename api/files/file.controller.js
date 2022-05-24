const path=require('path');
const uploadFile = require("./middleware");

const upload = async (req, res) => {
 

  
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " ,
      data : req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getFile =(req,res)=>{
const imagename= req.params.name;
const directoryPath = path.join(process.cwd(), "/uploads/");
    return  res.sendFile(path.join( directoryPath + imagename));
}
module.exports = {
  upload,
  getFile
};