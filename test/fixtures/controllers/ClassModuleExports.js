class ClassModuleExports {
  create(req, res) {
    res.send('created user: ' + req.body.name);
  }
}

module.exports = ClassModuleExports;
