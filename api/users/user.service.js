const conn = require("../../config/database");


module.exports = {
    create: (data, callBack) => {
      conn.query('insert into client(Nom,Prenom,mail,mdp) values(?,?,?,?)' ,
            [
                data.Nom,
                data.Prenom,
                data.mail,
                data.mdp
          ]   ,
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }

            return callBack(null, results);
          }
        );
      },
       getUsers: callBack => {
        conn.query(
          `select Nom, mail from client`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
    
      getUserByUserId: (id, callBack) => {
        conn.query(
          `select Nom, mail from client where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getUserByUserEmail: (mail, callBack) => {
        conn.query(
          `select * from client where mail= ?`,
          [mail],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      deleteUser: (id, callBack) => {
        conn.query(
          `delete from client where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      updateUser: (data, callBack) => {
        conn.query(
          `update client set Nom=?,Prenom=? ,mail=?, mdp=? where id=?`,
          [
            data.Nom,
            data.Prenom,
            data.mail,
            data.mdp,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      }
      
    };
 