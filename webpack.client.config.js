import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const manifestPath = path.resolve(__dirname, 'dist/client-manifest.json')
const componentDir = path.resolve(__dirname, 'src/components')

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
const entry = {}
for (const relativePath in manifest) {
  const name = relativePath.replace(/\.tsx$/, '')
  const absPath = path.join(componentDir, relativePath)
  entry[name] = absPath
}

export default {
  mode: 'development',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].js',
    publicPath: '/client/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
}
