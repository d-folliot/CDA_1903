function User(_user) {

  _user = _user || {};

  this.id = _user.id || '';
  this.firstname = _user.surname || '';
  this.lastname = _user.lastname || '';
  this.email = _user.email || '';
  this.password = _user.password || '';
  this.description = _user.descrip || '';
  this.role = _user.role || 'Usager';


}

User.prototype.isValid = function() {
   return true;
 }

module.exports = { User: User };