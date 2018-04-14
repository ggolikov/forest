var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var SVGSpriter = require('svg-sprite');

var config = {
    dest: 'src/css/icons',
    mode: {
        symbol: true
    }
};

var spriter = new SVGSpriter(config);

// Add SVG source files — the manual way ...
spriter.add('src/css/icons/show-preview.svg', null, fs.readFileSync('src/css/icons/show-preview.svg', {encoding: 'utf-8'}));
spriter.add('src/css/icons/zoom-to-feature.svg', null, fs.readFileSync('src/css/icons/zoom-to-feature.svg', {encoding: 'utf-8'}));
    /* ... */

// Compile the sprite
spriter.compile(function(error, result) {
    if (!error) {
        /* Write `result` files to disk (or do whatever with them ...) */
        for (var mode in result) {
            for (var resource in result[mode]) {
                console.log(resource);
                console.log(resource.path);
                mkdirp.sync(path.dirname(result[mode][resource].path));
                fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
            }
        }
    } else {
    }
});
