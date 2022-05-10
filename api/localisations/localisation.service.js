const conn = require("../../config/database");

module.exports = {
  getLocationPartById: (id_part,callBack) => {
    conn.query(`select * from localisation where id_part=?`,
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