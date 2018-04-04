import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import merge from 'webpack-merge';
import path from 'path';
import paths from './config';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(paths.src, 'index.html'),
    name: 'index.html',
    inject: 'body'
});

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

const common = {
    devtool: "cheap-inline-module-source-map",
    module: {
        rules: [{
                    test: /\.jsx?$/,
                    use: [{
                        loader: "babel-loader"
                    }],
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    use: [{
                        loader: "style-loader!css-loader"
                    }],
                    exclude: /node_modules/
                }, {
                    test: /\.sass$/,
                    use: extractSass.extract({
                        use: [{
                            loader: "css-loader" // translates CSS into CommonJS
                        }, {
                            loader: "sass-loader" // compiles Sass to CSS
                        }],
                        fallback: "style-loader" // creates style nodes from JS strings
                    }),
                    exclude: /node_modules/
                },  {
                    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                    use: [{
                        loader: "file-loader?name=[name].[ext]"
                    }],
                    exclude: /node_modules/
                }
        ]
    },
}

module.exports = (env) => {
    if (env.plugin) {
        console.log('build plugin');
        return merge({
            entry: {
                'forestProjectPlugin': `${paths.src}/plugin.js`,
                'preview': `${paths.src}/preview.js`
            },
            output: {
                path: paths.dist,
                filename: '[name].js'
            },
            plugins: [
                extractSass,
                new HtmlWebpackPlugin({
                    template: path.join(paths.src, 'preview.html'),
                    filename: 'preview.html',
                    chunks: ['preview'],
                    inject: 'body'
                }),
                new CopyWebpackPlugin([
                    { from: path.join(paths.src, 'css/forestProjectPlugin.css'), to: path.join(paths.dist, 'css/forestProjectPlugin.css') },
                    { from: path.join(paths.src, 'css/preview.css'), to: path.join(paths.dist, 'css/preview.css') },
                    { from: path.join(paths.src, 'css/scanex_logo.jpg'), to: path.join(paths.dist, 'css/scanex_logo.jpg') },
                    { from: path.join(paths.src, 'css/fontello'), to: path.join(paths.dist, 'css/fontello') }
                ])
            ]
        }, common);
    } else {
        console.log('build standalone');
        return merge({
            entry: {
                'index': `${paths.src}/index.js`,
                'preview': `${paths.src}/preview.js`
            },
            devServer: {
                historyApiFallback: true,
            },
            output: {
                path: paths.public,
                filename: '[name].js'
            },
            plugins: [
                extractSass,
                new HtmlWebpackPlugin({
                    template: path.join(paths.src, 'index.html'),
                    name: 'index.html',
                    chunks: ['index'],
                    inject: 'body'
                }),
                new HtmlWebpackPlugin({
                    template: path.join(paths.src, 'preview.html'),
                    filename: 'preview.html',
                    chunks: ['preview'],
                    inject: 'body'
                }),
                new CopyWebpackPlugin([
                    { from: path.join(paths.src, 'js/lib/GMXPluginTimeLine/L.Control.gmxTimeLine.css'), to: path.join(paths.public, 'css/L.Control.gmxTimeLine.css') },
                    { from: path.join(paths.src, 'css/main.css'), to: path.join(paths.public, 'css/main.css') },
                    { from: path.join(paths.src, 'css/preview.css'), to: path.join(paths.public, 'css/preview.css') },
                    { from: path.join(paths.src, 'css/scanex_logo.jpg'), to: path.join(paths.public, 'css/scanex_logo.jpg') },
                    { from: path.join(paths.src, 'css/fontello'), to: path.join(paths.public, 'css/fontello') }
                ])
            ]
        }, common);
    }
}
