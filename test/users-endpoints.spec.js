require('dotenv').config();
const { expect } = require("chai");
const knex = require('knex');
const supertest = require("supertest");
const app = require("../src/app");
const { makeUsers } = require('./users.fixtures');


describe('/api/users endpoint', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });

    beforeEach('clean the table', () => 
        db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    );

    describe('GET /api/users returns 200 and user information', () => {
        const testUserId = 1;
        const expected = {
            id:1, 
            email: 'demo@demo.com',
            password: 'Demo!1234',
        };
        return supertest(app).get(`/api/users/${testUserId}`).expect(200, expected);
    });

    //POST

    describe('POST api/users endpoint', () => {
        const reqFields = ['password', 'email'];

        describe('api/users validation', () => {
            const testUsers = makeUsers();
            reqFields.forEach((field) => {
                const reqBody = testUsers[0];
    
                it(`responds with 400 required error when ${field} is missing`, () => {
                    delete reqBody[field];
    
                    return supertest(app)
                        .post('/api/users')
                        .send(reqBody)
                        .expect(400, {
                            error: `Missing ${field}`,
                        });
                 });
            });
            it(`responds with 400 'Password must 8 or more characters' when password is less than 8 characters`, () => {
                let shortPass = (testUsers.password = 'short');

                return supertest(app).post('/api/users').send(shortPass).expect(400);
            });
        });
    
        it('when credentials are valid, create new user and responds with 201 and JWT auth token using JWT secret', () => {
            const testUsers = makeUsers();
    
            const expectToken = jwt.sign({ userid: 2 }, process.env.JWT_SECRET, {
                subject: testUsers[0].email,
                algorithm: 'HS256',
            });
    
            return supertest(app)
                .post('/api/users')
                .send(testUsers)
                .then((res) => {
                    expect(res.body.authToken).to.eql(expectToken);
                })
                .then(() => {
                    return supertest(app).post('/api/users').send(testUsers).expect(200, {
                        authToken: expectToken,
                    });
                });
        });
    }); 
});