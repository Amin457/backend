const conn = require("../../config/database");


module.exports = {
  create: (data, callBack) => {
    conn.query('insert into client(Nom,Prenom,mail,mdp,dateNaissance) values(?,?,?,?,?)',
      [
        data.Nom,
        data.Prenom,
        data.mail,
        data.mdp,
        data.dateNaissance
      ],
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
      `select * from client where mail= ? and etat=1`,
      [mail],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    conn.query(
      `update client set Nom=?,Prenom=? ,mail=?, mdp=?,dateNaissance=?,img=? where id=?`,
      [
        data.Nom,
        data.Prenom,
        data.mail,
        data.mdp,
        data.dateNaissance,
        data.img,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  registerNotif: (data, callBack) => {
    conn.query(
      'insert into notification(token,id_client) values(?,?)',
      [
        data.token,
        data.id_client
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteToken: (id, callBack) => {
    conn.query(
      'DELETE FROM notification WHERE id_client=?',
      [
        id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }

};
