const { create, getUserByUserEmail, getUserByUserId, updateUser, registerNotif,deleteToken } = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const conn = require("../../config/database");
const http = require("http");


module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    /*const salt = genSaltSync(10);
    body.mdp = hashSync(body.mdp, salt);*/
    conn.query('select mail from client where mail=?', [body.mail], (err, results, fields) => {
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
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
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
  },
  login: (req, res) => {
    let mail = req.body.mail;
    let mdp = req.body.mdp;
    if (mail && mdp) {
      getUserByUserEmail(mail, (err, results) => {
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
  updateUsers: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
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
  registerNotif: (req, res) => {
    const body = req.body;

    /* conn.query('select * from notification where token=?' ,[body.token] ,(err, results, fields) => {
       if (results.length >0) {
         return res.status(500).json({
           success: 0,
           message: "déja enrigistrer"
         });
       }*/

    registerNotif(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: 'insertion avec success',
        results
      });
    });

  },
  deleteToken: (req, res) => {
    const id = req.params.id;
    deleteToken(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1
      });
    });

  }
}


