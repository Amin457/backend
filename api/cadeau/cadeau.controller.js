const {getCadeauByIdPart,insertRecompense,getRecompense} = require("./cadeau.service");
const conn = require("../../config/database");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "-" + month + "-" + day;

module.exports = {
getCadeauByIdPart: (req, res) => {
    const id_part = req.params.id_part;
    getCadeauByIdPart(id_part, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length >0) {
        return res.json({
          data: results
        });
      }
        return res.json({
          message: "Record not Found"
      });
    });
  },
  
  insertRecompense: (req, res) => {
   const body = req.body;
   conn.query('select date,recompense.id,cadeau.id_part from recompense,cadeau where recompense.id_cadeau=cadeau.id_cadeau and id_client=? and DATEDIFF( ?, date )<7 and id_part=?',[body.id_client,newdate,body.id_part] ,(err, results, fields) => {
    if (results.length==0) {
    insertRecompense(body,(err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
     return res.status(200).json({
        success:1,
        message: "vous avez gagner"
      });
    });
    conn.query(
      `update cadeau set quantity=quantity-1 where id_cadeau=?`,
      [
        body.id_cadeau,
      ]
    );


   }else{

    conn.query('select DATEDIFF( ?,recompense.date ) as a from recompense,cadeau where recompense.id_cadeau=cadeau.id_cadeau and id_client=? and id_part=? and DATEDIFF( ?, date )<7',[newdate,body.id_client,body.id_part,newdate] ,(err, results1, fields) => {
      console.log(results1);
     
      return res.status(200).json({
          success : 0,
          message: "ressayer dans ",
          results1
        }); 
  
  
  });
   }

});


      },
      getRecompense: (req, res) => {
        const id = req.params.id;
        const id_part = req.params.id_part;

        getRecompense(id,id_part, (err, results) => {
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