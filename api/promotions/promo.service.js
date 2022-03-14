const conn = require("../../config/database");


module.exports = {
      getAllPromos: callBack => {
        conn.query(
          `select * from promotion`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
    };
 