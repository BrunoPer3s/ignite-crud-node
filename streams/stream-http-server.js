import http from 'node:http'
import { Transform } from 'node:stream'

// Chunks são pedaços de dados que são lidos e escritos em uma stream de forma assíncrona

class InverseNumberSteam extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(`${fullStreamContent}`);

  return res.end(fullStreamContent)

  /* return req
    .pipe(new InverseNumberSteam())
    .pipe(res) */
})

server.listen(3334)