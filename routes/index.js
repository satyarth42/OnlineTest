var express = require('express');
var router = express.Router();
var questions = require('../questions.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.post('/register', function (req, res, next) {
    var session,uname,roll,mail,contact;
    uname = req.body.uname;
    roll = req.body.roll;
    mail = req.body.inputEmail;
    contact = req.body.contactNo;
    session = {uname:uname,roll:roll,mail:mail,contact:contact};
    req.session.user=session;
    res.redirect('/waiting');
});

router.get('/waiting',function (req,res,next) {
    if(req.session.user)
        res.render('waiting');
    else
        res.render('error');
});

router.get('/logout',function (req, res, next) {
    req.session.destroy();
    res.render('logout');
});

router.get('/questions',function (req, res, next) {
    if(req.session.user)
        res.render('quiz_main',{title:'Quiz in Progress',session:req.session.user, questions:questions});
    else
        res.render('error');
});


module.exports = router;
