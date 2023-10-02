// controllers

// homepage - GET
const index = (req, res, next)=> {
    res.render('index', { title: 'Mi Primera página Express' });
  }

module.exports = {
  index, // index - GET
  
}