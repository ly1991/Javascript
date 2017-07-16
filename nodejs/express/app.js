var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
// app.use(require('body-parser').urlencoded({extended: true}))

var app = express();
var tweets = [];

app.get('/',(req,res)=>{
    res.send('welcome to node twitter')
}).listen(8000);

app.post('/send',urlencodedParser,(req,res)=>{
    if(req.body && req.body.tweet){
        tweets.push(req.body.tweet);
        res.send({status:'ok',msg: 'tweet reveived'})
    }else{
        res.send({status:'ok',msg: 'no tweet reveived'})
    }
});

app.get('/tweets',(req,res)=>{
    res.send(tweets);
});