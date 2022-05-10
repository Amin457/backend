const {getAllPromos,getPromoByPart} = require("./promo.service");
const conn = require("../../config/database");


module.exports = {
getAllPromos: (req, res) => {
    getAllPromos((err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    return res.json({
      success: 1,
      data: results
    });

  });
},
getPromoByPart: (req, res) => {
  const id = req.params.id;
  getPromoByPart(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      data: results
    });
  });
}
}
