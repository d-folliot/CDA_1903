function Login(EmailValue, PasswordValue, callback){
    
}

function SelectId(idValue, callback){
    db.get('SELECT * From userData WHERE id=?', idValue , function (err, row) {
        if (err) {
            console.log(err);
        }
        else{
        }
            if (row != null) {
                console.log(row);
                let user = new User(row);
                callback(user);
            }
            else {
                callback(null);
            }
    });
}

function SelectAll(callback){
    
}

function Create(user, callback){

    if((user instanceof User) && user.isValid()) {

    }

    db.get('SELECT EMAIL FROM userData WHERE email=?', user.emailUser, function (err, row) {
        if (err) {
            console.log(err);
        }
        
        if (row === undefined) {
          db.run('INSERT INTO userData (firstname, lastname, email, password, description, role) VALUES (?, ?, ?, ?, ?, ?)', 
          user.firstname, user.lastname, user.email, user.password, user.description, user.role, function (err) {
            if (err) {
                console.log(err);
            } 
            else {

                user.id = this.lastID;
                callback(JSON.stringify(user));
            }
          });
        }
        else{
          callback(null);
        }
      });
}

function Update(user,callback){
    // subquery
    db.run('UPDATE userData SET firstname = ?, lastname = ?, email = ?, password = ?, description = ?, role = ? WHERE id=? AND NOT EXISTS (SELECT EMAIL FROM userData WHERE email = ? AND id != ?)', 
    user.firstname, user.lastname, user.email, user.password, user.description, user.role, user.id, user.email, user.id, function (err) {
        if (err) {
            console.log(err);
            callback(null);
        } 
        else {
            callback(JSON.stringify(user));
        }
    });
}

function Delete(IdValue,callback){
  if (IdValue !== '' && IdValue !== undefined) {
    
    db.each('SELECT ID FROM userData WHERE id=? UNION ALL SELECT NULL LIMIT 1', IdValue, function (err, row) {
        if (err) {
        console.log(err);
        }
        if (row.id === null) {
        callback(false);
        } 
        else {
            
            db.run('DELETE FROM userData WHERE id=?', IdValue, function (err) {
                if (err) {
                    console.log(err);
                } 
                else {
                    callback(true);
                }
            });
        }
        });
    } 
    else {
        console.log(err);
        callback(false);
    }
}

