const {insertConfig,getPartByEmail,getPartenaires,getPartConfig} = require("./partenaire.service");
const { sign } = require("jsonwebtoken");
module.exports = {
  /*createConfig: (req, res) => {
    const body = req.body;
       insertConfig(body,(err, results) => {
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

},*/
login: (req, res) => {
  let mail = req.body.mail;
  let mdp = req.body.mdp;
  if (mail && mdp) {
    getPartByEmail(mail, (err, results) => {
      if (err) throw err;
      if (results) {
     const result = (mdp==results.mdp);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, "amin1234", {expiresIn: "1h"});
        return res.json({
          id: results.id,
          token: jsontoken
        });
      }
      }
      return res.status(401).json({
        unauthorised:true
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
    if (results.length >0) {
      return res.json({
       results
      });
    }
      return res.json({
        message: "Record not Found"
    });
  });
}
}


