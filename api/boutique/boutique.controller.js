const {getBoutiquePartById} = require("./boutique.service");

module.exports = {
  getBoutiquePartById: (req, res) => {
    const id_part = req.params.id_part;
    getBoutiquePartById(id_part, (err, results) => {
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
          success: 0,
          message: "Record not Found"
      });
    });
  }}