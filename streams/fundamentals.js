/* process.stdin
  .pipe(process.stdout) */

// Streams são mecanismos para ler e escrever dados de forma assíncrona, controlada e em partes

import { count } from 'node:console'
import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)

  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}

class InverseNumberSteam extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberSteam())
  .pipe(new MultiplyByTenStream())

// Método pipe encaminha os dados provindos de uma stream para outra