var net = require('net');

var chatServer = net.createServer(),
    clientList = [];

chatServer.on('connection',(client)=>{
    console.log('客户端开始连接……');
    client.name = client.remoteAddress + ':' +client.remotePort;
    client.write('Hi ' + client.name.substr(7) + '!\n');

    clientList.push(client);

    client.on('data',(data)=>{
        broardcast(data,client);
    });

    client.on('end',()=>{
        console.log(client.name + ' quit');
        clientList.splice(clientList.indexOf(client),1);
    });

    client.on('error',(e)=>{
        console.log(e);
    });
    console.log('客户端连接成功……');
}).listen(9000);

var broardcast = (msg,client)=>{
    var cleanup = [];
    for (var i = 0,len = clientList.length; i < len; i++) {
        if(client!==clientList[i]){
            if(clientList[i].writable){
                clientList[i].write(client.name.substr(7) + ' says: ' + msg);
            }else{
                cleanup.push(clientList[i]);
                clientList[i].destory();
            }
        }
    }

    for(var i=0,len=cleanup.length;i<len;i++){
        clientList.splice(clientList.splice(clientList.indexOf(cleanup[i])),1);
    }
};