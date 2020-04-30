const User = require ('./User').User;


class DbFakeUsers {
    constructor() {
        this.users = [
            new User({ id: 1, name: "Pierre", email: "pierre@email.fr", password: "1234" }),
            new User({ id: 2, name: "Paul", email: "paul@email.fr", password: "azer" }),
            new User({ id: 3, name: "Jacques", email: "jacques@email.fr", password: "4321" }),
        ];
    }

    get(_id) {
        return this.users.find(x => x.id === parseInt(_id));
    }
    
    getAll() {
        return this.users;
    }

    search(_name) {
        return this.users.find(x => x.name === _name);
    }

    add(_user) {
        let u = new User(_user);
        this.users.push(u);
        return u;
    }

    update(_user) {
        let u = this.users.find(x => x.id === parseInt(_id));

        if (u !== undefined) {
            u.update(_user);
        }

        return u;
    }

    delete(_id) {
        let position = this.users.findIndex(x => x.id === parseInt(_id));

        if (position > -1) {
            this.users.splice(position, 1);
        }
    }

}

module.exports = {
    DbUsers: DbFakeUsers
}