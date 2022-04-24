const {getNbQualite,getNbPrix,getNbAccueil,getNbPersonel} = require("./statRec.service");

module.exports = {
getNbQualite: (req, res) => {
    const body = req.body;
  getNbQualite(body, (err, results) => {
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
getNbAccueil: (req, res) => {
    const body = req.body;
    getNbAccueil(body, (err, results) => {
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
getNbPrix: (req, res) => {
    const body = req.body;
    getNbPrix(body, (err, results) => {
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
getNbPersonel: (req, res) => {
    const body = req.body;
    getNbPersonel(body, (err, results) => {
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
