var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry:{
      main:'./src/script/main.js',
        a:'./src/script/a.js',
        b:'./src/script/b.js',
        c:'./src/script/c.js'
    },
    output:{
        path: path.resolve(__dirname, './dist'),
        filename:'js/[name]-[chunkhash].js',
        publicPath:'http://cdn.com/'
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'a.html',
            template:'index.html',
            inject:'body',
            title:'a is good',
            chunks:['main','a'],
            excludeChunks:['a']//需排除的chunks
            // minify:{
            //     removeComments:true,//删除注释
            //     collapseWhitespace:true//删除空格
            // }
        }),
        new htmlWebpackPlugin({
            filename:'b.html',
            template:'index.html',
            inject:'body',
            title:'b is good',
            chunks:['b'],
            // minify:{
            //     removeComments:true,//删除注释
            //     collapseWhitespace:true//删除空格
            // }
        }),
        new htmlWebpackPlugin({
            filename:'c.html',
            template:'index.html',
            inject:'body',
            title:'c is good',
            chunks:['c'],
            // minify:{
            //     removeComments:true,//删除注释
            //     collapseWhitespace:true//删除空格
            // }
        })
    ]
};