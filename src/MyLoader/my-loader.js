const loaderUtils = require('loader-utils')
module.exports = function(source,sourceMaps){
    // 获取到用户给当前 Loader 传入的 options
    const options = loaderUtils.urlToRequest(this)
    console.log('options-->', options)
    this.cacheable && this.cacheable();
    // 通过 this.callback 告诉 Webpack 返回的结果
    this.callback(null, source.replace('world', ', ggg'), sourceMaps);
    return;
}