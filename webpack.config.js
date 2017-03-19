/**
 * Created by chenliming on 2017/3/16.
 */

var HtmlWebpackPlugin = require('html-webpack-plugin');  //html页面插件
var webpack = require("webpack");
module.exports = {
    //entry:"./public/javascripts/hello.js",  //单个文件
    //entry:["./public/javascripts/main.js","./public/javascripts/a.js"],  //多个文件压缩成一个文件
    entry:{
        a:"./public/javascripts/a.js",
        b:"./public/javascripts/b.js",
        main:"./public/javascripts/main.js"
    },
    devtool: 'eval-source-map',  //配置生成Source Maps，选择合适的选项
    output:{
        path:"./dist/js",  //输出目录
        //publicPath:'https:cnd.com/',  //输出前缀
        filename:"[name]-[hash].js"   //输出的文件名, [name]占位符标识,用文件的名字,当做输出文件名
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include:"/public",
                exclude: /node_modules/, //排除掉哪些目录 include为只编译的目录
                loader: "babel-loader",
                query:{"presets":"latest"}
            },
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options:{
                            importLoaders:1  //import导入的文件,也进过postcss-loader处理
                        }
                    },

                    {
                        loader: 'postcss-loader'
                        //这种方法,和上面的css-loader参数 importLoaders = 1有矛盾,所以在外面新建了一个postcss.config.js文件

                        //options: {
                        //    plugins: function () {
                        //        return [
                        //            //require('precss'),
                        //            require('autoprefixer')
                        //        ];
                        //    }
                        //}
                    }
                ]
                //loader:"style-loader!css-loader!postcss-loader"  //postcss-loader 后处理css模块,
                // css-loader可以将css文件模块化,style-loader表示可以将打包的css模块输出到页面
            },{
                test:/\.less$/,   //匹配less预处理文件
                use:["style-loader","css-loader","postcss-loader","less-loader"]
            },{
                test:/\.scss/,   //匹配sass预处理文件
                use:["style-loader","css-loader","postcss-loader","sass-loader"]
            },{
                test:/\.(png|jpg)$/i,   //文件处理,图片
                use:[{
                    "loader":"file-loader",     //处理样式引用的图片,也打包,如果html页面的图片也需要处理,
                    // 则在html-loader添加到webpackPlugin中,拓展:url-loader可以将图片转换为base64,image-webpack-loader可以压缩图片
                    options:{
                        name:"../images/[name]-[hash:5].[ext]"  //images目录下,.ext是后缀名
                    }
                }],

            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename:"myIndex.html",
            template:"index.tmp.html",  //指定模板文件,将打包的js文件,添加到新的index.html
            inject:"head",  //页面到如到head中
            title:"a 页面",

            minify:{     //压缩文件
                removeComments:true,   //去注释
                collapseWhitespace:true  //去空格
            }
        }),
        new HtmlWebpackPlugin({
            filename:"myIndex2.html",
            template:"html-loader!index.tmp.html",  //指定模板文件,将打包的js文件,添加到新的index.html
            inject:"head",
            title:"b 页面",
            chunks:["a","b"],  //只加载a.js和b.js
            excludeChunks:["a"],  //跳过a.js 此时该页面只剩下b.js


        })
    ]
    //devServer: {
    //    contentBase: "./views",//本地服务器所加载的页面所在的目录
    //    colors: true,//终端中输出结果为彩色
    //    historyApiFallback: true,//不跳转
    //    inline: true//实时刷新
    //}
}