// controllers
const request = require('request');
// definir los URLs para los ambientes de desarrollo y producción
const apiOptions = {
  server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://dw3-202310-1f0296649057.herokuapp.com/' // server heroku - producción
}

// listar users - GET - homepage
const index = (req, res, body) => {
  const path = '/api/users/';
  const requestOptions = { // objeto cargado con las opciones para request
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  console.log(requestOptions);
  request(
    requestOptions,
    (err, response, body) => {
      if (err) {
        console.log('Error al listar usuarios: ', err);
      } else if (response.statusCode === 200) {
        renderIndex(req, res, body);
        console.log('Objeto resultante: ', body);
      } else {
        console.log('Status: ', response.statusCode);
      }
    });
}

// homepage - GET
const renderIndex = (req, res, responseBody) => {
  res.render('index', { title: 'Listado de Usuarios', usuarios: responseBody });
}

module.exports = {
  index, // index - GET

}