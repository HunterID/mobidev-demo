require('dotenv').config();
const faker = require('faker');

const dbConnect = require('../db/dbConnect');
const Users = require('../db/model/users');

dbConnect();

const MAX_AMOUNT_NEW_USERS = 100;

async function addUsersToDB() {
    const newUsers = [];
    for (let i = 0; i < MAX_AMOUNT_NEW_USERS; i++) {
        newUsers.push({
            surname: faker.name.lastName(),
            name: faker.name.firstName(),
            birthday: faker.date.past(),
        });
    }
    await Users.insertMany(newUsers);

    process.exit(1)
}

addUsersToDB();
