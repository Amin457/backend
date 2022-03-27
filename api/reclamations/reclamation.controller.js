const {insertRec} = require("./reclamation.service");



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
  }
}

