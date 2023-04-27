
exports.seed = async function(knex) {
    await knex("users").del();

    await knex("users").insert([
        { id: 'kjqjuhe27ye872t283y', name: "Hoang Hong", phone: '0327227902', email: 'hdat.dev1@gmail.com', password: 'khnasdjuioashd', address: 'Ha Tinh Ha Tinh Haf Tinh',dob : '12/02/2018', admin: true },
        { id: 'kjqjuhe27ye872t2833', name: "Nguyen Hung", phone: '0327227908', email: 'hdat.dev2@gmail.com', password: 'khnasdjuioashd', address: 'Ha Tinh Ha Tinh Haf Tinh',dob : '12/02/2018', admin: true },
        { id: 'kjqjuhe27ye872t2834', name: "Tieu Khoa", phone: '0327227902', email: 'hdat.dev3@gmail.com', password: 'khnasdjuioashd', address: 'Ha Tinh Ha Tinh Haf Tinh',dob : '12/02/2018', admin: true },
        { id: 'kjqjuhe27ye872t2836', name: "Truong Hao", phone: '0327227902', email: 'hdat.dev4@gmail.com', password: 'khnasdjuioashd', address: 'Ha Tinh Ha Tinh Haf Tinh',dob : '12/02/2018', admin: true },
    
    ]);
};
