const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var router = express.Router();
//nos moteur de templates 
app.set('view engine', 'ejs')
// parse requests of content-type - application/json
//nos middleware
app.use('/assets', express.static('public')) //le dossier servant a distribuer les css
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  
  res.render('user/index')
});

require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 7979;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});