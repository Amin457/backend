const {insertRec,getAllRec} = require("./reclamation.service");



module.exports = {
 createRec: (req, res) => {
    const body = req.body;
    insertRec(body,(err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
     return res.status(200).json({
        success: 1,
        message: "success"
      });
    });
  },
  getAllRec: (req, res) => {
    const id = req.params.id;
    getAllRec(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length >0) {
        return res.json({
          results
        });
      }
        return res.json({
          message: "Record not Found"
      });
    });
  }
}

