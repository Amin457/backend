const {getLocationPartById} = require("./localisation.service");

module.exports = {
 getLocationPartById: (req, res) => {
    const id_part = req.params.id_part;
    getLocationPartById(id_part, (err, results) => {
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
  }}