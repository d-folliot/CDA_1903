const crypto = require('crypto');

class Token {
    constructor(_user) {
        this.userId = _user.id;
        this.dateAdd = Date.now();
        this.dateEnd = (this.dateAdd + 3600);
        this.token = crypto.createHash('sha256').update((this.userId + this.dateAdd).toString()).digest('hex');
    }
}

module.exports = {
    Token: Token
};