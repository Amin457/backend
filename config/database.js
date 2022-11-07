const mysql = require("mysql");
var conn = mysql.createConnection({
    port:3307,
    database:"digicard",
    host:"localhost",
    password:"amin",
    user:"root"
  });

conn.connect(function(err){
    if(err){
        throw err
    }
});

module.exports = conn;