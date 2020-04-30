class User {
    constructor(_user) {
        this.id = 0;
        this.name = '';
        this.email = '';
        this.password = '';
        this.update(_user || {});
    }

    update(_user)
    {
        _user = _user || {};
        this.id = parseInt(_user.id || 0);
        this.name = _user.firstname || 'Anonymous';
        this.email = _user.email || 'ano@nymo.us';
        this.password = _user.password || '';
    }
}

module.exports = {
    User: User
}