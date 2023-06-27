import { resolve } from 'path';

export default {
  build: {
    outDir: resolve(__dirname, '../wwwroot/studs'),
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'MyLib'
    }
  }
}
