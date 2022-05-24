const conn = require("../../config/database");


module.exports = {
  getUserByUserEmail: (mail, callBack) => {
    conn.query(
      `select * from admin where mail= ?`,
      [mail],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    conn.query(
      `select id, Nom,Prenom, mail,etat,img from client`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPartenaire: callBack => {
    conn.query(
      `select id_part,societe,mail,Fax,tel,codePostal,img,etat from partenaire`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPartenaireById: (id, callBack) => {
    conn.query(
      `select id_part,societe,mail,Fax,tel,codePostal,img,etat from partenaire where id_part=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
  ,
  deleteUser: (id, etat, callBack) => {
    if (etat == 1) {
      conn.query(
        `update client set etat=0 where id = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    } else {

      conn.query(
        `update client set etat=1 where id = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );

    }
  },
  deletePartenaire: (id, etat, callBack) => {
    if (etat == 1) {
      conn.query(
        `update partenaire set etat=0 where id_part = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    } else {

      conn.query(
        `update partenaire set etat=1 where id_part = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );

    }
  },
  create: (data, callBack) => {
    conn.query('insert into partenaire(societe,mail,mdp,Fax,tel,codePostal,img) values(?,?,?,?,?,?,?)',
      [
        data.societe,
        data.mail,
        data.mdp,
        data.Fax,
        data.tel,
        data.codePostal,
        data.img

      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  insertConfig: (data, callBack) => {
    conn.query('insert into config(adresseIP,env,storeID,dbId,id_part) values(?,?,?,?,?)',
      [
        data.adresseIP,
        data.env,
        data.storeID,
        data.dbId,
        data.id_part

      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  ajouterBoutique: (data, callBack) => {
    conn.query('insert into localisation(id_part,boutique) values(?,?)',
      [
        data.id_part,
        data.boutique

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
