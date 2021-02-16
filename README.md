# Reflect - Server

## RESTful API for Reflect-Client

    heroku url: https://reflect-server.herokuapp.com/

### Endpoints
    POST /api/auth/login | post new user to get authentication to access database
    GET /api/users | get the user
    POST /api/users | register new user
    GET /api/reflections | get all reflections
    GET /api/reflections/:id | get a reflection by id
    POST /api/reflections | add a new reflection
    PATCH /api/reflections/:id | edit a reflection
    DELETE /api/reflections/:id | delete reflection


## Technologies
    Node.
    Express.
    JWT.
    Mocha&Chai.
    Nodemon.
    Supertest.
    PostgreSQL



### Express.js, PostgreSQL, Node.js
### Scripts

    Start the application npm start
    Start development server npm dev
    Run database migrations npm run migrate
    Run test database migrations npm run migrate:test
    Deploy to heroku & run migrations npm run deploy

## Use / Set-up

    clone repo
    install and audit dependencies, npm i & npm audit fix
    create psql databases 'reflect' and 'reflect-test', createdb reflect && createdb reflect-test
    create .env file
    configure .env :

    PORT=[your_dev_port]
    DATABASE_URL='postgresql://postgres@localhost/reflect'
    TEST_DATABASE_URL='postgresql://postgres@localhost/reflect-test'

    run database migrations, npm run migrate && npm run migrate:test

### Once you're done following the steps you should be able to run the server locally!
