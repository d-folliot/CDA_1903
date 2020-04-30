/* Module Express.js */
const express = require('express');
const app = express();

/* Module DbUsers (base de données simulée) */
const DbUsers = require('./models/DbFakeUsers').DbUsers;



const dbUsers = new DbUsers();
console.log(dbUsers);


app.get('/', function (req, res){
    res.json({message: "Hello world !"});
});

app.get('/users', function (req, res){
    let users = dbUsers.getAll();
    res.json(users);
});

app.get('/users/:id', function (req, res){
    let users = dbUsers.get(req.params.id);
    res.json(users);
});



app.set('port', 8000);
console.log('Server running: http://localhost:' + app.get('port'));
app.listen(app.get('port'));
