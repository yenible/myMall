// module.exports = {
//   // 表示准备配置webpack的config
//   configureWebpack: {
//     reslove: {
//       // 别名，内部以及有了@的别名了
//       alias: {
//         'aaa': '@/assets',
//         'common': '@/common',
//         'components': '@/components',
//         'network': '@/network',
//         'views': '@/views',
//       }
//     }
//   }
// }

// module.exports = {
//   // 表示准备配置webpack的config
//   chainWebpack: (config) => {
//         config.resolve.alias
//         .set('@',resolve('./src'))
//         .set('components',resolve('./src/components'))
//         .set('views',resolve('src/views'))
//         .set('aaa',resolve('src/assets'))
//         //set第一个参数：设置的别名，第二个参数：设置的路径
//   }
// }

const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
        .set('views',resolve('./src/views'))
        .set('assets',resolve('./src/assets'))
        .set('common',resolve('./src/common'))
        .set('network',resolve('./src/network'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    }
}
