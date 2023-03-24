// const http = require('http') / CommonJS => require
import http from 'http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

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

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body : Envio de informações de um formulário (HTTPs)



// http://localhost:3333/users?userId=1?name=Bruno

// GET http://localhost:3333/users/1 Buscar o usuário de id 1
// DELETE http://localhost:3333/users/1 Deletar o usuário de id 1

// POST http://localhost:3333/users


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)

