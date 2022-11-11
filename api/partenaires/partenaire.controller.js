const {getPartByEmail, getPartenaires, getPartConfig, getNamePartById, updatePart,create,updateConfig} = require("./partenaire.service");
const { sign } = require("jsonwebtoken");
const conn = require("../../config/database");

module.exports = {

  login: (req, res) => {
    let mail = req.body.mail;
    let mdp = req.body.mdp;
    if (mail && mdp) {
      getPartByEmail(mail, (err, results) => {
        if (err) throw err;
        if (results) {
          const result = (mdp == results.mdp);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "amin1234", { expiresIn: "1h" });
            return res.json({
              id: results.id,
              token: jsontoken
            });
          }
        }
        return res.status(401).json({
          unauthorised: true
        });

      });
    }
  },
  getPartenaires: (req, res) => {
    getPartenaires((err, results) => {
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
    getPartConfig: (req, res) => {
    const id_part = req.params.id_part;
    getPartConfig(id_part, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          results
        });
      }
      return res.json({
        message: "Record not Found"
      });
    });
  },
  getNamePartById: (req, res) => {
    const id_part = req.params.id_part;
    getNamePartById(id_part, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.json({
          data: results[0]
        });
      }
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    });
  },
  updatePart: (req, res) => {
    const data = req.body;
    updatePart(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: 'modification avec succées !!',
        results
      });
    });
  },
  demande : (req, res) => {
    const body = req.body;
    conn.query('select mail from partenaire where mail=?', [body.mail], (err, results, fields) => {
      if (results.length > 0) {
        return res.status(500).json({
          success: 0,
          message: "email alredy in use"
        });
      }

      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    }
    );
  },
  /*createConfig: (req, res) => {
    const body = req.body;
        updateConfig(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            message: "mise a jours effectué"
          });
        });
  },*/
}


