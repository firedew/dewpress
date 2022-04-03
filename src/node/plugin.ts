import { Plugin } from 'vite'

export default function dewPressPlugin(): Plugin {
  return {
    name: 'dewpress',

    async transform(code, id) {
      if (id.endsWith('.md')) {
        console.log('Should transform', id)
      }

      return Promise.resolve(code)
    }
  }
}
