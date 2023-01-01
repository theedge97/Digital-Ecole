const sql = require("./db.js");

// constructor
const  Actualite = function(actue) {
    this.titre = actue.titre;
    this.contenue = actue.contenue;

  };

  Actualite.lesactualites = result => {
    sql.query("SELECT * FROM `actualites`, `ecoles` WHERE actualites.ecoleId = ecoles.id AND ecoles.nom = 'Groupe schoolaire Safourata Bah'", (err, res) => {
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
  module.exports = Actualite;