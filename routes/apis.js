var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const db = require('../collections');
var salt = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({'name': "hsiaoshen"});
});

router.route('/userlist')
.get(function(req,res){
  res.header('Acess-Control-Allow-Origin', '*');  //解决跨域访问问题
  db.user.find({}, function(err,result){
    if(err) console.log(err);
    // console.log(result);
    res.json(result);
    })
})
.post(function(req,res){
  res.header('Acess-Control-Allow-Origin', '*');
  db.user.find({}, function(err,result){
    if(err) console.log(err);
    // console.log(result);
    res.json(result);
    })
})


router.route('/register')
.post((req, res, next) => {
  // console.log(req.body);
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    var user = new db.user({
      name: req.body.name,
      password: hash
    });
    user.save((err, data) => {
    res.json({result: 'OK'});
    });
  });

});
module.exports = router;
