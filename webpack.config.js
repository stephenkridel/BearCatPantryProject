const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const glob = require( 'glob' );
const PurgecssPlugin = require( 'purgecss-webpack-plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;


const PATHS = {
    views: path.join( __dirname, '/views/' )
}
const cssOutput = 'main.css';

//Whitelist css rules with exact class
function collectWhitelist() {
    return [ 'loader', 'is-invalid', 'is-valid', 'disabled' ];
}

// Whitelist css rules with classes containing these
function collectWhitelistPatterns() {
    return [ /popupS-/, /modal-/, /disabled-/ ];
}

console.log( process.env.NODE_ENV )

const config = {
    entry: {
        main: [ './src/main.js' ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve( __dirname, './build/' )
    },
    resolve: {
        alias: {
            $: "jquery/src/jquery"
        }
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [ {
            test: /\.js$/,
            include: [ path.resolve( __dirname, "./src/js/" ) ],
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                query: {
                    presets: [ 'es2015' ]
                }
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract( {
                use: [ 'css-loader' ],
                fallback: 'style-loader'
            } )

        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader?name=[name].[ext]'
            ]
        } ]
    },
    optimization: {
        minimize: false
    },
    mode: process.env.NODE_ENV,
    plugins: [ new webpack.DefinePlugin( {
            'process.env': {
                'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
            }
        } ),
        new ExtractTextPlugin( cssOutput ),
        new PurgecssPlugin( {
            paths: glob.sync( `${PATHS.views}/**/*`, {

                nodir: true
            } ),
            whitelist: collectWhitelist,
            whitelistPatterns: collectWhitelistPatterns
        }, ),
        // new BundleAnalyzerPlugin()
    ]
};

if ( process.env.NODE_ENV === 'production' ) {
    config.optimization.minimize = true
} else {
    config.devtool = "inline-source-map"
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}


module.exports = config