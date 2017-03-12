module.exports = {


  'get': function (req, res) {

    res.send('get user');

  },

  'create': function (req, res) {

    res.send('create user: '+ req.body.name);

  },

  'destroy': function (req, res) {

    res.send('destroy user: '+ req.body.name);

  },

  'update': function (req, res) {

    res.send('update user: '+ req.body.name);

  }

}