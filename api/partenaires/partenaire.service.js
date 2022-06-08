const conn = require("../../config/database");


module.exports = {
  getPartenaires: callBack => {
    conn.query(
      `select * from partenaire where etat=1`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
  ,
  getPartConfig: (id_part, callBack) => {
    conn.query(`select adresseIP,env,storeID,dbId from partenaire where id_part=?`,
      [id_part],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getPartByEmail: (mail, callBack) => {
    conn.query(
      `select * from partenaire where mail= ? and etat=1`,
      [mail],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getNamePartById: (id_part, callBack) => {
    conn.query(`select societe from partenaire where id_part=?`,
      [id_part],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  updatePart: (data, callBack) => {
    conn.query(
      `update partenaire set societe=?,mail=?,mdp=?,Fax=?,tel=?,codePostal=?,img=? where id_part=?`,
      [
        data.societe,
        data.mail,
        data.mdp,
        data.Fax,
        data.tel,
        data.codePostal,
        data.img,
        data.id_part
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  create: (data, callBack) => {
    conn.query('insert into partenaire(societe,mail,mdp,Fax,tel,codePostal,img,etat) values(?,?,?,?,?,?,?,2)',
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
        conn.query('select id_part from partenaire where mail =?',
          [
            data.mail
          ],
          (error, results, fields) => {


            return callBack(null, results);
          }
        );
      }
    );
  }

};
