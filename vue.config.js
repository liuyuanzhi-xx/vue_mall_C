const px2rem = require('postcss-px2rem');
const path = require("path")
// console.log(path.join(__dirname, 'src/styles/vux_theme.less'))
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    px2rem({
                        remUnit: 37.5
                    })
                ]

            },
            less: {
                modifyVars: {
                    hack: `true; @import '${path.join(__dirname, 'src/styles/vux_theme.less')}';`,
                },
            },
        }
    },
    devServer: {
        proxy: {
            '/': {
                target: "https://mallapi.duyiedu.com/goods"
            }
        }
    }
}