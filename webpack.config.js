var path = require('path')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin') // Добавлено

module.exports = {
    entry: './src/js/main.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app'),
    },

    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    // {
                    //     loader: 'css-loader',
                    //     options: { sourceMap: true },
                    // },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },

    plugins: [
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: 'style.css',
        // }),
        new HtmlBundlerPlugin({
            // path to templates
            entry: 'src/html/pages/',
            preprocessor: 'ejs',
            inject: true,
            js: {
                // output filename for JS
                filename: 'js/[name].js',
            },
            css: {
                // output filename for CSS
                filename: 'css/[name].css',
            },
        }),
    ],

    optimization: {
        minimizer: [
            // this plugin is called at the PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE stage
            new HtmlMinimizerPlugin({}),
            new TerserPlugin({
                // Минификация JavaScript
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },

    performance: {
        hints: false,
    },
}
