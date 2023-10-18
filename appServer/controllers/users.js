// controllers
const request = require('request');
// definir los URL's para los ambientes de desarrollo y producción
const apiOptions = {
    server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://dw3-202310-1f0296649057.herokuapp.com/' // server heroku - producción
}
                 
let usuarios = [
    {
        nombre: 'Martín',
        apellido: 'Mafla',
        direccion: 'Quito'
    },
    {
        nombre: 'Mateo',
        apellido: 'Bonilla',
        direccion: 'Cumbayá'
    },
    {
        nombre: 'Fernanda',
        apellido: 'Quintero',
        direccion: 'Tumbaco'
    }
];

// listar users - GET
const users = (req, res, body)=> {
    const path = '/api/users/';
    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions, 
        (err, response, body)=>{
            if (err) {
                console.log('Error al listar usuarios: ', err);
            } else if (response.statusCode === 200) {
                renderUsers(req, res, body);
            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección de usuarios'
                })
            }
        });
  }

// Render de la vista users
const renderUsers = (req, res, responseBody)=> {
    res.render('users', { title: 'Listado de Usuarios', usuarios: responseBody });
}

//RENDER USERS_CREATE
const renderUsersCreate = (req, res, responseBody)=> {
    res.render('users_create', { title: 'Crear Usuario' });
}

//CREAR DOCUMENTO DE USUARIO
const doUsersCreate = (req, res, body)=> {
    const path = '/api/users/';
    const postdata = {
        name: req.body.nombre,
        lastname: req.body.apellido,
        identification: req.body.identificacion,
        direction: req.body.direccion,
        age: req.body.edad,
        phone: req.body.telefono,
        subjects: {
            class: req.body.tipo,
            names: req.body.nombres,

        },
        major: req.body.carrera,
        date: req.body.creado,

    }
    console.log(postdata)
    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
        (err, response, body)=>{
            if (response.statusCode === 201) {
                console.log('Cracion exitosa');
                res.render('users_create', {title:"creacion de usuarios", mensaje: "Usuario creado exitosamente"});
            } else {
                console.log('Status: ', response.statusCode);
                console.log(err);
                res.render('error', {
                    mensaje: 'Existe un error en la colección de usuarios'
                })
            }



        }
    );
}


//Eliminar usuario
const renderUsersDelete = (req, res, responseBody)=> {
    res.render('users_delete', {
        title: 'Eliminar Usuario',
        nombre: responseBody.name,
        apellido: responseBody.lastname,
        identificacion: responseBody.identification,
        direccion: responseBody.direction,
        edad: responseBody.age,
        telefono: responseBody.phone,
        tipo: responseBody.subjects.class,
        nombres: responseBody.subjects.names,
        carrera: responseBody.major,
        creado: responseBody.date,
        documento: responseBody._id
    });
}

//1. mandar a buscar el usuario con el numero de id y mostrarlo en el formulario
const deleteUsers = (req, res, body)=> {
    const path = `/api/users/${req.params.userid}`;
    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body)=>{
            if (err) {
                console.log('Error al listar usuario: ', err);
            } else if (response.statusCode === 200) {
                console.log(body)
                renderUsersDelete(req, res, body);
            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'No existe el usuario'
                })
            }
        }
    );
}

//2. eliminar el documento
const doUsersDelete = (req, res, body)=> {
    const path = `/api/users/${req.params.userid}`;
    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body)=>{
            if (err) {
                console.log('Error al eliminar usuario: ', err);
            } else if (response.statusCode === 204) {
                console.log('Eliminacion exitosa');
                return res.redirect('/');
            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'No existe el usuario'
                })
            }

        }
    );



}

module.exports = {
    users, // Users - GET


    //creacion de usuarios
    //1. RENDER DE LA VISTA
    renderUsersCreate, // users_create - RENDER DE LA VISTA PARA CREAR USUARIOS
    //2. CREACION DE USUARIOS
    doUsersCreate,


    //eliminar usuarios
    //1. RENDER DE LA VISTA
    deleteUsers, // users_delete - RENDER DE LA VISTA PARA ELIMINAR USUARIOS
    //2. ELIMINACION DE USUARIOS
    doUsersDelete,
}