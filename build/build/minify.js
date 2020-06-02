var fs = require('fs');
var minify = require('minify');
var pkg = require('./package.json');

var src = './qrcode-source.js';
var dst = './qrcode.js';

minify(src)
.then(function(data) {
    var comment = "\n/*! qrcode-svg v1.1.0 | https://github.com/papnkukn/qrcode-svg | MIT license */\n\n"
    var js = comment + data + '\n';
    fs.writeFileSync(dst, js);
    console.log("Minified!");
})
.catch(function(error) {
    if (error) return console.error(error);
});
