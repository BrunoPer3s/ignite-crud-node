// const http = require('http') / CommonJS => require
import http from 'http'
import { json } from './middlewares/json.js'

// - HTTP
// - Método HTTP
// - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso do back-end
// PUT => Atualizar um recurso do back-end
// PATCH => Atualizar uma informação específica de um recurso do back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)

