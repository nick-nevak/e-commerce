const path = require('path');

const resolvePath = p => path.resolve(__dirname, `./src/${p}`);

module.exports = {
    webpack: {
        alias: {
        "@api": resolvePath('api'),
        "@pages": resolvePath('pages'),
        "@features": resolvePath('features'),
        "@providers": resolvePath('providers'),
        "@ltypes": resolvePath('types'),
        }
    },
}