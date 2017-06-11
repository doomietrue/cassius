var isDev = true;

module.exports = {
    type   : 'react-component',
    npm    : {
        esModules: true,
        umd      : false
    },
    webpack: {
        rules: {
            css: {
                options: {
                    modules       : true,
                    localIdentName: (isDev ? '[name]__[local]__' : '') + '[hash:base64:5]'
                }
            }
        }
    }
}
