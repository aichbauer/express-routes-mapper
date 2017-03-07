module.exports = {


  'get': function (req, res) {

    res.send('get user')

  },

  'create': function (req, res) {

    res.send('create user: '+ req.body.name);

  }

}