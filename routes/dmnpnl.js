var express = require('express');
var router = express.Router();
var crypto = require('crypto');

const secret = 'ojha';
router.get('/', function(req, res, next) {
    res.render('admn_pnl', { title: 'Administrator' });
});

router.post('/login',function (req, res, next) {
    password = req.body.password;
    const hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
    if(hash==='30df25a5f3ca4239b7c594b3d893d8952d0fc41f55bdd76e768a8c5269f9c88d')
    {
        res.redirect('control_panel');
    }
    else
    {
        console.log("failure "+hash);
        res.redirect('/admin');
    }
});

router.get('/control_panel',function (req,res,next) {
    res.render('control_panel');
});

module.exports = router;
