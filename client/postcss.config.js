/*
 * @Author: 19875196595 2458190458@qq.com
 * @Date: 2024-03-18 20:25:27
 * @LastEditors: 19875196595 2458190458@qq.com
 * @LastEditTime: 2024-03-18 20:41:57
 * @FilePath: \socialnexus\client\postcss.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const webpack = require('webpack')
const config = {
  parser: require('postcss-comment'),
  plugins: [
    require('postcss-import')({
      resolve (id, basedir, importOptions) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
        } else if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
        }
        return id
      }
    }),
    require('autoprefixer')({
      remove: process.env.UNI_PLATFORM !== 'h5'
    }),
    require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
  ]
}
if (webpack.version[0] > 4) {
  delete config.parser
}
module.exports = config
