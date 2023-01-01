
const sql = require("./db.js");

// constructor
const  Cours = function(cours) {
    this.titre = cours.titre;
    this.description = cours.description;
    this.idprofs = cours.idprofs;

  };

  Cours.TouCours = result => {
    sql.query("SELECT * FROM cours", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      
    });
  };
  Cours.rechercher = result => {
    sql.query("SELECT * FROM `cours`,`professeurs`  WHERE cours.idprofs = professeurs.id", (err, res) => {
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
  module.exports = Cours;