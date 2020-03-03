const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = () => {  // メインとなるJavaScriptファイル（エントリーポイント）
    return {
        mode: "development",
        entry: {
            home : `./src/js/home.js`,
            any : `./src/js/any.js`,
            anyname: './src/scss/style.scss',
        },
        // ファイルの出力設定
        output: {    //  出力ファイルのディレクトリ名
            path: `${__dirname}/dist`,
            filename: 'js/[name].js',   // 出力ファイル名
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' },
                    ],
                }
            ],
        },
        devServer: {
            contentBase: "dist",
            open: true
        },
        plugins:[
            // MiniCssExtractPluginの影響でcssなのでjsとして出力されるの防止
            new FixStyleOnlyEntriesPlugin({
                extensions: ['scss']
            }),

            // cssの出力先を指定する
            new MiniCssExtractPlugin({ filename: 'style/[name].css' }),
        ],
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({})],
        },
    }
};
