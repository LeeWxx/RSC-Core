import express from 'express'
import path from 'path'
import fs from 'fs'
import React from 'react'

const rscServerModule = require('react-server-dom-webpack/server')


const renderToPipeableStream = rscServerModule.renderToPipeableStream

import App from '../src/App'

const clientManifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../dist/client-manifest.json'), 'utf-8')
)

const app = express()

app.use('/client', express.static(path.resolve(__dirname, '../dist/client')))


app.get('/rsc', (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/x-component');

    const { pipe } = renderToPipeableStream(<App />, clientManifest)

    pipe(res)
  } catch (err) {
    console.error('RSC stream error:', err)
    res.status(500).send('Internal Server Error')
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})


