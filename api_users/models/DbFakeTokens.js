const User = require ('./User').User;
const Token = require ('./Token').Token;

class DbFakeTokens {
    constructor() {
        this.tokens = [
            new Token(new User({ id: 1 }))
        ];
    }

    get(_id) {
        return this.tokens.find(x => x.id === parseInt(_id));
    }

    getAll() {
        return this.tokens;
    }

    search(_token) {
        return this.tokens.find(x => x.token === _token);
    }

    searchValid(_token) {
        return this.tokens.find(x => (x.token === _token && x.dateEnd < Date.now()));
    }

    add(_user) {
        let u = new Token(_user);
        this.tokens.push(u);
        return u;
    }

}

module.exports = {
    DbTokens: DbFakeTokens
}