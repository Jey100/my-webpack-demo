module.exports = {
    plugins: [
        //自动添加css前缀
        require('autoprefixer')({
            browsers: ["last 5 versions"]
        })
    ]
}