const { getAllPromos, getPromoByPart,Create } = require("./promo.service");
const conn = require("../../config/database");


module.exports = {
  create: async (req, res) => {
    try {

      var data = req.body;
      await Create(data);
      return res.status(201).json({ message: 'created' });
    } catch (e) {
      return res.status(500).json({
        "message": e.message
      });
    }
  },
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
