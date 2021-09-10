const express = require('express')
const path = require('path')

const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ 
  dev,
  dir: path.resolve(__dirname, './src/nextApp')
})

const handler = app.getRequestHandler()

const nextRouter = express.Router()
nextRouter.get('*', (req, res) => {
  return handler(req, res)
})

app.prepare().then(() => {
  const server = express()

  server.use('/', nextRouter)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})