const { getAllCartes,getCarteById,deleteCarte,getInactive} = require("./carte.service");

module.exports = {
  getAllCartes: (req, res) => {
    const id = req.params.id;
    getAllCartes(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          success: 1,
          data: results
        });
      }
      return res.json({
        success: 0,
        message: "vous n'avez auncun carte fidélité"
      });
    });
  },
  getInactive: (req, res) => {
    const id = req.params.id;
    getInactive(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          success: 1,
          data: results
        });
      }
      return res.json({
        success: 0,
        message: "aucun"
      });
    });
  }
  ,
  getCarteById: (req, res) => {
    const id_client = req.params.id_client;
    const id_carte = req.params.id_carte;
    getCarteById(id_client, id_carte, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
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
  },
  deleteCarte: (req, res) => {
    const id = req.params.id;
    const etat = req.params.etat;

    deleteCarte(id, etat, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "carte deleted successfully"
      });
    });
  }
}