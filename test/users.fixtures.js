const makeUsers = () => {
    return[
        {
            email: 'test1@gmail.com',
            password: 'Test1!pass'
        },
        {
            email: 'test2@gmail.com',
            password: 'Test2!pass'
        },
        {
            email: 'test3@gmail.com',
            password: 'Test3!pass'
        }
    ];
}

const makeUsers2 = () => {
    return[
        {
            id: 4,
            email: 'test1@gmail.com',
            password: 'Test1!pass'
        },
        {
            id: 5,
            email: 'test2@gmail.com',
            password: 'Test2!pass'
        },
        {
            id: 6,
            email: 'test3@gmail.com',
            password: 'Test3!pass'
        }
    ];
}

module.exports = { makeUsers, makeUsers2 };