const request = require('request');
const {response} = require("express");

const apiOptions = {
    server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production'){
    apiOptions.server = 'https://dw3-2021-1.herokuapp.com';
}



let usuarios = [
    {
        nombre:'Juan Francisco Cisneros',
        direccion:'Cumbaya, Quito, Ecuador',
        telefono:'099 999 9999',
    },
    {
        nombre:'Pedro Perez',
        direccion:'Tumbaco, Quito, Ecuador',
        telefono:'011 111 1111',
    },
    {
        nombre:'Maria Perez',
        direccion:'Pifo, Quito, Ecuador',
        telefono:'022 222 2222',
    },

];

//make request to api
const users = (req, res) => {
    const path = '/api/users';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(
        requestOptions,
        (err, response, body) => {
            if (err) {
                console.log(err);
            } else if (response.statusCode === 200) {
                console.log(body);
                renderUsers(req, res, body);

            } else {
                console.log(response.statusCode);
            }
        }
    );
}

renderUsers = (req, res, responseBody) => {
    res.render('users', {
        title: 'Usuarios',
        usuarios: responseBody,
    });
}

module.exports = {
    users,
}

