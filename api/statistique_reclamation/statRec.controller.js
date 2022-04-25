const {getNbQualite,getNbPrix,getNbAccueil,getNbPersonel,getNbRecParMoix,getNbRecParBoutique} = require("./statRec.service");

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
},

getNbRecParMoix: (req, res) => {
    const body = req.body;
    getNbRecParMoix(body, (err, results) => {
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

getNbRecParBoutique: (req, res) => {
    const body = req.body;
    getNbRecParBoutique(body, (err, results) => {
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
