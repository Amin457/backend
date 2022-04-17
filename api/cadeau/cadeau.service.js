const conn = require("../../config/database");

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = year + "-" + month + "-" + day;

module.exports = {
        getCadeauByIdPart: (id_part,callBack) => {
          conn.query(`select * from cadeau where id_part=? and quantity>0`,
          [id_part],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
        
                return callBack(null, results);
              }
            );
          },
          insertRecompense: (data, callBack) => {
            conn.query('insert into recompense (id_client,id_cadeau,date) values(?,?,?)' ,
            [
                data.id_client,
                data.id_cadeau,           
                newdate
          ]   ,
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
              }
            );
 
        
          },
          getRecompense: (id, callBack) => {
            conn.query(`select cadeau.description,partenaire.societe ,recompense.date  from cadeau,partenaire,recompense where recompense.id_cadeau=cadeau.id_cadeau and cadeau.id_part=partenaire.id_part and recompense.id_client=?`,
            [id],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
          
                  return callBack(null, results);
                }
              );
            }
}