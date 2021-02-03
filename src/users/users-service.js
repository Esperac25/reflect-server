const knex = require('knex');
const bcrypt = require('bcryptjs');

const UsersService = { 
    userWithEmail(knex, email){
        return (
            knex('users')
                .where({ email })
                .first()
                .then((user) => !!user)
        );
    },
    insertUser(knex, newUser){
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then((rows) => rows[0]);
    },
    hasPassword(password){
        return bcrypt.hash(password, 12);
    },
    getUsers(knex){
        return knex('users').select('*')
    }
}

module.exports = UsersService;