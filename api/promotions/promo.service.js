const conn = require("../../config/database");
module.exports = {
      getAllPromos: callBack => {
        conn.query(
          `select * from promotion ORDER BY date_debut desc`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getPromoByPart: (id, callBack) => {
        conn.query(
          `select * from promotion where id_part=?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      }
   };
   
