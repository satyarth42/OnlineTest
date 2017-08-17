var express = require('express');
var router = express.Router();
var questions = require('../questions.json');

/* GET home page. */
var session,uname,roll,mail,contact;
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.post('/register', function (req, res, next) {
    uname = req.body.uname;
    roll = req.body.roll;
    mail = req.body.inputEmail;
    contact = req.body.contactNo;
    session = {uname:uname,roll:roll,mail:mail,contact:contact};
    res.redirect('/waiting');
});

router.get('/waiting',function (req,res,next) {
    res.render('waiting',{sess:session});
});
router.get('/maintest', function (req, res, next) {
    res.render('maintest',{sessi:session});
});

router.get('/logout',function (req, res, next) {
    session={};
    res.render('logout');
});

router.get('/questions',function (req, res, next) {
    res.render('quiz_main',{title:'Quiz in Progress',session:session, questions:questions});
});


module.exports = router;
