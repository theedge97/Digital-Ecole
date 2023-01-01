/*     insertion d'un nouveau document       
  matricule.insertOne(           
      {  
              "name": "la 10eanne",
              "eleve": [
                {
                  "Matricule" : 20201001,
                  "Nom": "Camara Kadidja"
                },
                {
                  "Matricule" : 20201002,
                  "Nom": "Ly Ramatoulaye "
                },
                {
                  "Matricule" : 20201003,
                  "Nom": "Ly Mayatou"
                },
                {
                  "Matricule" : 20201004,
                  "Nom": "Diallo Abdoulaye"
                },
                {
                  "Matricule" : 20201005,
                  "Nom": "Sidibe Siaka"
                },
                {
                  "Matricule" : 20200906,
                  "Nom": "Barry Binta"
                }
                
              ]
          }
             
         
             ) */

             
/*  insertion d'un element dans un document
db.collection("inscrit").updateOne(
                { name: "la 7eanne"},
                {
                  $push : { eleve : { "Nom": "Camara Foungbe",
                  "Matricule": 20201090,
                  "telephone": "625281190",
                  "Motdepasse": "12345"}}
                }
              )                                if (discut[0]['eleve'][i].Nom === Nom && discut[0]['eleve'][i].Matricule === parseInt(request.body.matricule)) {
                response.render('pages/forumapprentissage', { erreur: erreur});
              }     */
              /* 



function (request, response) {
    //
    const MongoClient = require('mongodb').MongoClient;
    var MongoObjectID = require("mongodb").ObjectID;
    var idfind = request.cookies.idfind;
    var classe = request.cookies.classe;
    var cour = request.cookies.cour;
    var objtofind = { _id: new MongoObjectID(idfind) };
    const assert = require('assert');
    //url de connection
    const url = "mongodb://localhost:27017/ecole";
    //nom de la bdd
    const dbName = 'ecole';
    //recuperer la valeur de recherche
    var  question = '';
    //requette
    var lesreponse = '';
    var message = request.body.message;
    var pseudo = request.cookies.nom;
    //"id": "5f17844ff8e07f1b5418e154"
    //creation d'un nouveau mongoclient
    const client = new MongoClient(url ,  { useUnifiedTopology: true });
    client.connect( function (err, client) {
        assert.equal(null, err);
        console.log('connecter corectement');
        const db = client.db(dbName);
        const rp = db.collection('7eannee');
        const discution = db.collection(classe);
        
        const query = {"name": cour, "question.id": ObjectId(idfind) }
        const updateDocument = { 
            $push : { "question.$.reponse" : {
                "pseudo": pseudo,
                "reponse": message,
                "date": "2020-12-31T23:00:00.000Z"
              }}
        }
        const result =  rp.updateOne(query, updateDocument);
        discution.find({"name": cour}).toArray(function (err, discut) {
            questioner = discut[0]['question'];
            for (let i = 0; i < questioner.length; i++) {
                if (questioner[i].id == idfind) {
                    lesreponse = questioner[i]['reponse'];
                    question = questioner[i];
                }
              
            }
            response.render('pages/forumrepondre', { question: question, lesreponse: lesreponse});   
        })
            console.log(question)
        
        response.locals.nom = request.cookies.nom
        response.locals.matricule = request.cookies.monmatricule
        response.locals.classe = request.cookies.classe
        response.locals.mesmatiere = request.cookies.mesmatiere
       
    })
    
}







*/

           /*  
        discution.insertOne({  
        
            "_id": 13,
            "name": "Anglais",
            "question": [
              {
                "question": "Le corps humains est composer de combien d'os?",
                "id": new ObjectID(),
                "pseudo": "Ali cisse",
                "date": "2020-10-31T23:00:00.000Z",
                "reponse": [
                  {
                    "pseudo": "sako Aminata",
                    "reponse": "208 os",
                    "date": "2020-12-31T23:00:00.000Z"
                  },
                  {
                    "pseudo": "doumbouya aminata",
                    "reponse": "3 os",
                    "date": "2020-12-31T23:00:00.000Z"
                  }
                ]
              },
              {
                "question": "Qu'est ce que un invertebrer?",
                "id": new ObjectID(),
                "pseudo": "C'est un animale mamifere",
                "date": "2020-10-31T23:00:00.000Z",
                "reponse": [
                  {
                    "pseudo": "Dillo binta",
                    "reponse": "C'est un animale qui n'a pas d'os",
                    "date": "2020-12-31T23:00:00.000Z"
                  },
                  {
                    "pseudo": "Aliou Diallo",
                    "reponse": "3 regions naturel",
                    "date": "2020-12-31T23:00:00.000Z"
                  }
                ]
              }
            ]
        }
           
       
           ) 
        discution.find({"name": "8eannee"}).toArray(function (err, docs) {
            console.log('bien conecter')
        }) */
        /* 
function (request, response) {
    //poser une question 
    const MongoClient = require('mongodb').MongoClient;
    var MongoObjectID = require("mongodb").ObjectID;
    var idfind = "5f17844ff8e07f1b5418e154"
    var objtofind = { _id: new MongoObjectID(idfind) };
    const assert = require('assert');
    //url de connection
    const url = "mongodb://localhost:27017/ecole";
    //nom de la bdd
    const dbName = 'ecole';
    //recuperer la valeur de recherche
    var  question = '';
    //requette
    var lesreponse = '';
    //creation d'un nouveau mongoclient
    const client = new MongoClient(url ,  { useUnifiedTopology: true });
    client.connect( function (err, client) {
        assert.equal(null, err);
        console.log('connecter corectement');
        const db = client.db(dbName);
        const rp = db.collection('7eannee');
        rp.find({name: "Chimie"}).toArray(function (err, repond) {
              console.log(repond[0])
        }) 
        response.locals.nom = request.cookies.nom
        response.locals.matricule = request.cookies.monmatricule
        response.locals.classe = request.cookies.classe
        response.locals.mesmatiere = request.cookies.mesmatiere
        response.render('pages/forumnovosujet', {  lesreponse: lesreponse});
        console.log(request.cookies.nom);   
    })
    
}
*/

  /*     insertion d'un nouveau document       
  matricule.insertOne(           
      {  
              "name": "la 10eanne",
              "eleve": [
                {
                  "Matricule" : 20201001,
                  "Nom": "Camara Kadidja"
                },
                {
                  "Matricule" : 20201002,
                  "Nom": "Ly Ramatoulaye "
                },
                {
                  "Matricule" : 20201003,
                  "Nom": "Ly Mayatou"
                },
                {
                  "Matricule" : 20201004,
                  "Nom": "Diallo Abdoulaye"
                },
                {
                  "Matricule" : 20201005,
                  "Nom": "Sidibe Siaka"
                },
                {
                  "Matricule" : 20200906,
                  "Nom": "Barry Binta"
                }
                
              ]
          }
             
         
             ) */
             
         
/*  insertion d'un element dans un document
db.collection("inscrit").updateOne(
                { name: "la 7eanne"},
                {
                  $push : { eleve : { "Nom": "Camara Foungbe",
                  "Matricule": 20201090,
                  "telephone": "625281190",
                  "Motdepasse": "12345"}}
                }
              )                                if (discut[0]['eleve'][i].Nom === Nom && discut[0]['eleve'][i].Matricule === parseInt(request.body.matricule)) {
                response.render('pages/forumapprentissage', { erreur: erreur});
              }     */