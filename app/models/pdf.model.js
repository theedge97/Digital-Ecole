
const { chapitre } = require("../controllers/cours.controller.js");
const sql = require("./db.js");

// constructor
const  Pdf = function(lespdf) {
    
    this.lepdf = lespdf.lepdf;
    this.idcours = lespdf.idcours;
    this.idchapitre = lespdf.idchapitre;
  };
//recherche des chapitres d'un cours
  Pdf.rechpdf = ( result) => {
    sql.query(`SELECT * FROM  pdfcour ,cours ,chapitres WHERE pdfcour.idcours = cours.id AND pdfcour.idchapitre = chapitres.id  `, (err, res) => {
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
  //souschapitre recherche
  /*
  SELECT * FROM `pdfcour`,`cours`, `chapitres` WHERE pdfcour.idcours = cours.id AND pdfcour.idchapitre = chapitres.id AND cours.titre = "Cours d'introduction a la pedagogie" AND chapitres.lechapitre = "Introduction" 
  
  */
  Pdf.rechpdfsouschap = ( cours, chapitre, result) => {
    sql.query(`SELECT * FROM  pdfcour ,cours ,chapitres WHERE pdfcour.idcours = cours.id AND pdfcour.idchapitre = chapitres.id AND cours.titre = "${cours}" AND  chapitres.lechapitre = "${chapitre}" `, (err, res) => {
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
  module.exports = Pdf;