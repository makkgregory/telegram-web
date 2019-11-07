const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const {ProgressPlugin} = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const isDevelopment = !isProduction;
    const srcPath = path.resolve(__dirname, 'src');
    const buildPath = path.resolve(__dirname, 'build');
    const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

    return {
        mode: isProduction ? 'production' : 'development',
        entry: path.resolve(srcPath, 'main.ts'),
        output: {
            path: buildPath,
            filename: '[contenthash].js',
            chunkFilename: '[contenthash].js'
        },
        resolve: {
            extensions: ['.ts', '.js'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: tsconfigPath
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: tsconfigPath
                        }
                    }
                },
                {
                    test: /\.(c|le|sa|sc)ss$/i,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isDevelopment
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                }

            ]
        },
        devServer: {
            port: 4200,
            contentBase: buildPath
        },
        plugins: [
            new ProgressPlugin(),
            new CleanPlugin(),
            new HtmlPlugin({
                template: path.resolve(srcPath, 'index.html'),
                minify: isProduction
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[contenthash].css',
                chunkFilename: isDevelopment ? '[id].css' : '[contenthash].css'
            }),
            new CopyPlugin([
                {
                    from: path.resolve(srcPath, 'meta'),
                    to: buildPath
                },
                {
                    from: path.resolve(srcPath, 'assets'),
                    to: path.resolve(buildPath, 'assets')
                }
            ])
        ]
    }
};
