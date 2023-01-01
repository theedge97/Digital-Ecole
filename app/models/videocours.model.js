
const { souschap } = require("../controllers/cours.controller.js");
const sql = require("./db.js");

// constructor
const  Video = function(vi) {
    
    this.videocours = vi.videocours;
    this.idcours = vi.idcours;
    this.idchapitre = vi.idchapitre;
    this.idsouschapitre = vi.idsouschapitre;
  };
//recherche des chapitres d'un cours
  Video.rechvideo = ( result) => {
    sql.query(`SELECT * FROM  video ,cours ,chapitres, souschapitre WHERE video.idcours = cours.id AND video.idchapitre = chapitres.id AND video.idsouschapitre = souschapitre.id`, (err, res) => {
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
  Video.rechsousvideo = (cours, chapitre, souschapitre, result) => {
    //SELECT * FROM `video`, `cours`, `chapitres`, `souschapitre` WHERE video.idcours = cours.id AND video.idchapitre = chapitres.id AND video.idsouschapitre = souschapitre.id AND cours.titre = "Cours initiation a la pedagogie" AND chapitres.lechapitre = "Introduction" AND souschapitre.lesouschapitre = "Premier partie"
    sql.query(`SELECT * FROM  video ,cours ,chapitres, souschapitre WHERE video.idcours = cours.id AND video.idchapitre = chapitres.id AND video.idsouschapitre = souschapitre.id AND cours.titre = "${cours}" AND chapitres.lechapitre = "${chapitre}" AND souschapitre.lesouschapitre = "${souschapitre}"`, (err, res) => {
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
  module.exports = Video;