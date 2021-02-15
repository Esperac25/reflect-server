const supertest = require("supertest");
const app = require("../src/app");
const returnSomething = require('./reflections.fixtures');

describe("App", () => {
  it('GET / responds with 200 containing "Hello, reflect-server!"', () => {
    const expected = returnSomething();
    return supertest(app)
    .get('/')
    .expect(200, expected);
  });
});
