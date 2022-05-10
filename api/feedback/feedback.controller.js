const {insertFeed , updateFeed ,getAllQuest,getAllRep} = require("./feedback.service");
const conn = require("../../config/database");



module.exports = {
 createFeed: (req, res) => {
    const body = req.body;
    conn.query('select * from feedback where id_client=? and id_part=? and id_question=?' ,[body.id_client,body.id_part,body.id_question] ,(err, results, fields) => {
    if (results.length >0) {
      console.log(results);

     updateFeed(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
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
getAllQuest: (req, res) => {
  const id_part = req.params.id_part;
  getAllQuest(id_part, (err, results) => {

    if (err) {
      console.log(err);
      return;
    }
    
    getAllRep(id_part, (err, results1) => {

    if (results.length >0) {
      return res.json({
        question : results,
        reponse : results1
      });
    }
      return res.json({
        success: 0,
        message: "Record not Found"
    });
  
  });
  });
}
  }


