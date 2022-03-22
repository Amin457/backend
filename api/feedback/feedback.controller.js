const {insertFeed , updateFeed} = require("./feedback.service");
const conn = require("../../config/database");



module.exports = {
 createFeed: (req, res) => {
    const body = req.body;
    conn.query('select * from feedback where id_client=? and id_part=?' ,[body.id_client,body.id_part] ,(err, results, fields) => {
    if (results.length >0) {
     updateFeed(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            return res.json({
              success: 1,
              message: "updated successfully"
            });
          });

    }else{

    insertFeed(body,(err, results) => {
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
    })};
  }
);
}
  }


