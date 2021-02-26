module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://bahb.cn1.utools.club",
                changeOrigin: true
            }
        }
    },
}
