const {insertFeed , updateFeed ,getAllFeed} = require("./feedback.service");
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
            console.log(results);
            return res.json({
              success: 1,
              message: "updated successfully",
              results
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
      console.log(results);
      return res.status(200).json({
        success: 1,
        message: "success",
        results
      });
    })};
  }
);
},
getAllFeed: (req, res) => {
  const id = req.params.id;
  getAllFeed(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (results.length >0) {
      return res.json({
        success: 1,
        data: results
      });
    }
      return res.json({
        success: 0,
        message: "Record not Found"
    });
  });
}
  }


