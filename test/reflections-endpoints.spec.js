require('dotenv').config();
const { expect } = require("chai");
const knex = require('knex');
const supertest = require("supertest");
const app = require("../src/app");
const { makeUsers2 } = require('./users.fixtures');
const { makeReflections } = require('./reflections.fixtures');
const { before } = require('mocha');

describe('reflection endpoints' , () => {
    let db;
    let authToken;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });

    beforeEach('clean the table', () => 
        db.raw('TRUNCATE TABLE users, reflections RESTART IDENTITY CASCADE')
    );
    
    beforeEach('register and login', () => {
        let user = { password: 'Test!1234', email: 'testuser@test.com' };
        return supertest(app)
            .post('/api/users')
            .send(user)
            .then((res) => {
                return supertest(app)
                .post('/api/auth/login')
                .send(user)
                .then((res2) => {
                    authToken = res2.body.authToken;
                });
            });
    });

    after('disconnect from db', () => db.destroy());

    afterEach('cleanup', () => sb('reflections').truncate());

    // GET
    describe('GET /api/reflections', () => {
        context(`Given there are reflections in the db`, () => {
            const testReflections = makeReflections();
            const testUsers = makeUsers2();
            beforeEach('insert users', () => {
                return db.into('reflections').insert(testReflections);
            });
            it('responds with 200 and all of the reflections', () => {
                return supertest(app)
                .get('/api/reflections')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200)
                .then((res) => {
                    expect(res.body.length > 0)
                    expect(res.body[0].title === testReflections[0].title);
                });
            });
        });
    });
    
    //POST

    describe('POST /api/reflections', () => {
        const testUsers = makeUsers();
        beforeEach('insert users', () => {
            return db.into('users').insert(testUsers);
        });
        it('create a refection and responds with 201 and new reflection', () => {
            const newReflection = makeReflections();
            return supertest(app)
                .post('/api/reflections')
                .set('Authorization', `Bearer ${authToken}`)
                .send(newReflection[0])
                .expect(201)
                .then((res) => {
                    expect(res.body.title).to.equal(newReflection[0].title);
                    supertest(app)
                        .get(`/reflections/${res.body.id}`)
                        .then((newRes) => {
                            expect(newRes.body.title).to.equal(newRes[0].title);
                        });
                });
        });
    });

    // DELETE

    describe('DELETE /api/reflections/:id', () => {
        context(`Given no reflections`, () => {
            it(`responds 404`, () => {
                const reflectionId = 50;
                return supertest(app)
                    .delete(`/api/reflections/${reflectionId}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect(404, { error: { message: `reflection doesn't exist`}});
            });
        });
    
        context('Given there are reflections', () => {
            const testUsers = makeUsers2();
            const testReflections = makeReflections();
    
            beforeEach('insert users', () => {
                return db.into('users').insert(testUsers);
            });
    
            beforeEach('insert reflections', () => {
                return db.into('reflections').insert(testReflections);
            });
    
            it('responds 204 and deletes reflection', () => {
                const idDelete = 1;
                const expectReflections = testReflections.filter(
                    (reflection) => reflection.id !== idDelete
                );
                return supertest(app)
                    .delete(`/api/reflections/${idDelete}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect(204)
                    .then((res) => {
                        supertest(app)
                            .get(`/api/reflections`)
                            .set('Authorization', `Bearer ${authToken}`)
                            .expect(expectReflections);
                    });
            });
        });
    });

    //PATCH
    
    describe(`PATCH /api/reflections/:id`, () => {
        context(`Given there is a reflection with id`, () => {
            const testUsers = makeUsers2();
            const testReflections = makeReflections();
    
            beforeEach('insert users', () => {
                return db.into('users').insert(testUsers)
            });
    
            beforeEach('insert reflections', () => {
                return db.into('reflections').insert(testReflections)
            });
    
            it(`responds 200 and updates reflection`, () => {
                const idUpdate = 3;
                const updateReflection = {
                    title: 'A new and updated title'
                };
                const expectReflection = {
                    ...testReflections[idUpdate - 1],
                    ...updateReflection,
                };
                return supertest(app)
                    .put(`/api/reflections/${idUpdate}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect(200)
                    .then((res) => 
                        supertest(app)
                            .get(`/api/reflections/${idUpdate}`)
                            .set('Authorization', `Bearer ${authToken}`)
                            .send(expectReflection)
                    );
            });
        });
    });

});










