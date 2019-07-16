var express = require('express');
var router = express.Router();

var data = [
    {name:'Yuri',age:24,mail:'Yuri@Yuru'},
    {name:'akari',age:36,mail:'akaza@akari'},
    {name:'Touko',age:17,mail:'nanami@touko'}
];

router.get('/',(req,res,next)=>{
    var n = req.query.id;
    res.json(data[n]);
});
module.exports = router;