// webpack.server.config.js

import path from 'path'
import { fileURLToPath } from 'url'
import nodeExternals from 'webpack-node-externals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'development',
  target: 'node', 
  entry: path.resolve(__dirname, 'server/index.tsx'),
  externalsPresets: { node: true }, 
  externals: [nodeExternals()],     
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.cjs',          
    libraryTarget: 'commonjs2',     
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json'),
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
}
