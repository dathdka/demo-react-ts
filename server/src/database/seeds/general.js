const { faker } = require('@faker-js/faker/locale/vi');
const v4 = require('uuid').v4


exports.seed = async function(knex) {
    await knex("users").del();
    let userList =[]
    for(let i=0; i<1000; i++){
        userList.push({
            id : v4(),
            name : faker.name.fullName(),
            phone: faker.phone.number().replace(/[^0-9]g/,''),
            email : faker.internet.email(),
            password : faker.internet.password(),
            address : faker.address.cityName(),
            dob: faker.date.birthdate(),
            image : faker.image.avatar(),
            admin : faker.helpers.arrayElement([true, false])
        })
    }

    await knex("users").insert(userList);
};
