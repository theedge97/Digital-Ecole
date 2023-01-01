
const sql = require("./db.js");

// constructor
const  Chapitre = function(chap) {
    this.lechapitre = chap.lechapitre;
    this.idcours = chap.idcours;
  };
//recherche des chapitres d'un cours
  Chapitre.rechercher = (chapitre,  result) => {
    sql.query(`SELECT * FROM chapitres, cours  WHERE chapitres.idcours = cours.id AND cours.titre = "${chapitre}" `, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  module.exports = Chapitre;