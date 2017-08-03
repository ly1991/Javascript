let mongoose = require('mongoose');
let db = mongoose.createConnection('localhost','test');

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){

});

let PersonSchema = new mongoose.Schema({
    name:String   //定义一个属性name，类型为String
});

let PersonModel = db.model('Test',PersonSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如下：
//let PersonModel = db.model('Person');
//如果没有发布，上一段代码将会异常

let personEntity = new PersonModel({name:'test'});


personEntity.save();  //执行完成后，数据库就有该数据了