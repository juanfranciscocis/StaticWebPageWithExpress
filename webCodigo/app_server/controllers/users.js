// controllers

let usuarios = [
    {
        nombre: 'Tomas',
        apellido:'Davila',
        direccion: 'Tumbaco'
    },
    {
        nombre: 'Mateo',
        apellido:'Bonilla',
        direccion: 'Quito'
    },
    {
        nombre: 'Martin',
        apellido:'Mafla',
        direccion: 'Cumbaya'
    }
];

// users - GET
const users = (req, res, next)=> {
    res.render('users', { title: 'Listado de usuarios', usuarios });
  }

module.exports = {
  users // users - GET
  
}