// webpack.client.config.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  target: 'web',

  entry: {
    index: path.resolve(__dirname, 'client/index.tsx'),
  },

  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].js',
    publicPath: '/client/',
  },

  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-server-dom-webpack/client$':
        path.resolve(
          __dirname,
          'node_modules/react-server-dom-webpack/client.browser.js'
        ),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                // Webpack 빌드시만 noEmit을 해제
                noEmit: false
              }
            }
          }
        ]
      },
    ],
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist/client'),
    },
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
};
