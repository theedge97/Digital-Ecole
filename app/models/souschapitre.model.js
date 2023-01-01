
const sql = require("./db.js");

// constructor

//SELECT * FROM `souschapitre` , `chapitres`, `cours` WHERE souschapitre.idcours = cours.id AND souschapitre.idchapitre = chapitres.id
const  Souschapitre = function(souschap) {
    this.lesouschapitre = souschap.lesouschapitre;
    this.idcours = souschap.idcours;
    this.idchapitre = souschap.idchapitre;
  };
//recherche des chapitres d'un cours
  Souschapitre.rechersouschap = (  result) => {
    sql.query(`SELECT * FROM souschapitre, cours, chapitres  WHERE souschapitre.idcours = cours.id AND souschapitre.idchapitre = chapitres.id `, (err, res) => {
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
  Souschapitre.recherlessouschap = ( cours , result) => {
    sql.query(`SELECT * FROM souschapitre, cours, chapitres  WHERE souschapitre.idcours = cours.id AND souschapitre.idchapitre = chapitres.id 
    AND cours.titre =  "${cours}" `, (err, res) => {
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
  module.exports = Souschapitre;