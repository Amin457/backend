const {getAllPromos} = require("./promo.service");

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
}
}