const {getUserByUserEmail,getUsers,deleteUser,getPartenaire,deletePartenaire,create,insertConfig,ajouterBoutique,getPartenaireById} = require("./admin.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const conn = require("../../config/database");
const http = require("http");


module.exports = {
  login: (req, res) => {
    let mail = req.body.mail;
    let mdp = req.body.mdp;
    if (mail && mdp) {
      getUserByUserEmail(mail, (err, results) => {
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
  getUsers: (req, res) => {
    getUsers((err, results) => {
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
  getPartenaire: (req, res) => {
    getPartenaire((err, results) => {
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
  getPartenaireById: (req, res) => {
    const id = req.params.id;
    getPartenaireById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  }
  ,
  deleteUser: (req, res) => {
    const id = req.params.id;
    const etat = req.params.etat;

    deleteUser(id,etat, (err, results) => {
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
        message: "user deleted successfully"
      });
    });
  },
  deletePartenaire: (req, res) => {
    const id = req.params.id;
    const etat = req.params.etat;

    deletePartenaire(id,etat, (err, results) => {
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
        message: "user deleted successfully"
      });
    });
  },
  createPartenaire: (req, res) => {
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
          success: 1
        });
      });
    }
    );
  },
  createConfig: (req, res) => {
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
        success: 1
      });
    });

},
ajouterBoutique: (req, res) => {
  const body = req.body;
  ajouterBoutique(body,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection errror"
      });
    }
    return res.status(200).json({
      success: 1
    });
  });

}
}