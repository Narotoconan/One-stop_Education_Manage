const path = require("path")

module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://www.narotoconan.top:25565",
                changeOrigin: true
            }
        }
    },
    pluginOptions: { // 第三方插件配置
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/css/Common/Common.less')] // less所在文件路径
        }
    }
}
