const sqlModule = require('./gestionSql');
const userMod = require('./UserModel');
var user = null;

const InitialiseDB = ()=>{
  sqlModule.CreatDB();
}

const GetData = (app)=>{
  app.get('/database', function (req, res) {
    sqlModule.getAll(function(users){
      res.send(users);
    });
 });
};

const BonusSelect = (app)=>{
  app.get('/database/:id', function (req, res) {
    
    sqlModule.selectId(req.params.id,function(user){
      if (user !== null) {
          console.log(user);
          
        res.send(JSON.stringify(user));
      }
      else{
        res.send('{"error": "le message d erreur"}');
      }
    });
  });
};

const AddData = (app)=>{
app.post('/add', function (req, res) {
    console.log(req.body);
    user = new userMod.User(req.body);
  
   sqlModule.add( user, function(callback){
    if (callback !== null) {
      console.log(callback);
    }
    else{
      console.log('La creation a echoue');
    }
  });
 });
};

const TryConect =(app)=>{
 app.post('/connection', function (req, res) {
    var EmailValue = req.body.email;
    var PasswordValue = req.body.password;

    sqlModule.get(EmailValue,PasswordValue, function(user){
      
      if(user != null){

        //Test Update
        user = JSON.parse(user);
        user.firstname = "zebre";
        console.log(user);
        sqlModule.update(user,function(callback){
          if (callback !== null) {
            console.log(callback);
          }
          else{
            console.log(callback +" pas update");
          }
        });
      }
    });
  });
};

const BonusDelete = (app)=>{
  app.post('/delete', function (req, res) {
    var IdValue = req.body.id;
    sqlModule.remove(IdValue,function(callback){
      if (callback) {
        console.log('User supprimer');
      }
      else{
        console.log('suppression impossible');
      }
    });
  });
};

const BonusUpdate = (app)=>{
  app.post('/update', function (req, res) {
    var IdValue = req.body.id;
    
    sqlModule.update(user,function(callback){
      if (callback !== null) {
        console.log(callback);
      }
      else{
        console.log('impossible de faire la modification');
      }
    });
  });
};

  module.exports = {
    get:GetData,
    add:AddData,
    connexion: TryConect,
    delete: BonusDelete,
    initialiseDB: InitialiseDB,
    update: BonusUpdate,
    select: BonusSelect
  };
/*
curl -d "{\"firstname\" : \"Lewis\",\"lastname\" : \"Carroll\",\"email\" : \"zzzebree11ail.fr\",\"password\" : \"azertyx\",\"description\" : \"je suis une description\",\"role\" : \"Usager\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
curl -d "{\"email\" : \"zzzebree11ail.fr\",\"password\" : \"azertyx\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/connection"
*/

    
     //   app.set('view engine','ejs');
    // user =null;
   //  console.log(user)
   /* if(user !== null){
      if(user.role==='administrateur'){
        // res.render('/AdminPage');
       //  res.send('Vous etes dans la zone de gestion faite pour les administrateur!');
       }
       else{
        // res.render('index.html');
        // res.send('Vous etes dans la zone faite pour les utilisateur!');
       }
     }
*/