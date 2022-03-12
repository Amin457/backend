const {create,getUserByUserEmail,getUserByUserId,getUsers,deleteUser} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const conn = require("../../config/database");



module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    /*const salt = genSaltSync(10);
    body.mdp = hashSync(body.mdp, salt);*/
    conn.query('select mail from client where mail=?' ,[body.mail] ,(err, results, fields) => {
    if (results.length >0) {
      return res.status(500).json({
        success: 0,
        message: "email alredy in use"
      });
    }

    create(body,(err, results) => {
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
        data: results
      });
    });
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
  deleteUser: (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, results) => {
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
  login: (req, res) => {
    let mail = req.body.mail;
    let mdp = req.body.mdp;
    if (mail && mdp) {
      getUserByUserEmail(mail, (err, results) => {
        if (err) throw err;
        if (results) {
          
          const result = (mdp==results.mdp);
      if (result) {
          req.session.loggedin = true;
          req.session.mail = mail;
          return res.json({
            success: 1,
            message: "login successfully",
            data : results
          });
        }
        }
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
		
        
      });
    }
  }
  }


