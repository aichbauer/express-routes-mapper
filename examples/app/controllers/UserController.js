export default class UserController {

  get (req,res) {

    res.send('get user')

  }


  create (req,res) {

    res.send('created user: ' + req.body.name);

  }


  destroy (req,res) {

    res.send('get user')

  }


  update (req,res) {

    res.send('created user: ' + req.body.name);

  }

}