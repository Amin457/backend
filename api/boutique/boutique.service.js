const conn = require("../../config/database");

module.exports = {
  getBoutiquePartById: (id_part,callBack) => {
    conn.query(`select * from boutique where id_part=?`,
    [id_part],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
  
          return callBack(null, results);
        }
      );
    }
}