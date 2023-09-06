



let users = [
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




//user controller
userHomePage = (req, res) => {
    res.render('users',{users});
}

module.exports = {
    userHomePage
}

