var express = require('express');
var router = express.Router();
var questions = require('../questions.json');
var mongoose = require('mongoose');
var use = require('../models/userdata');

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
        res.render('waiting',{session:req.session.user});
    else
        res.render('error');
});

router.get('/logout',function (req, res, next) {
    use.find({roll:req.session.user.roll}).exec(function(err,data){
        req.session.destroy();
        res.render('logout',{response:data[0].answers});
    });
});

router.get('/questions',function (req, res, next) {
    var classes = ["panel-primary","panel-info","panel-danger","panel-warning","panel-success"]
    if(req.session.user)
        res.render('quiz_main',{title:'Quiz in Progress',session:req.session.user, questions:questions, classes:classes});
    else
        res.render('error');
});

router.get('/scores',function(req, res, next){
    use.find({}).sort({score: -1}).exec(function(err, data) {
        res.render('scores', {users:data,title:"Leaderboard"});
    });
});


module.exports = router;
