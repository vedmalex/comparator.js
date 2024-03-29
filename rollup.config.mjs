import pkg from './package.json' assert { type: 'json' }
import { createConfig } from './rollup.config.base.mjs'
import path from 'node:path'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default createConfig({
  input: './src/index.ts',
  root: __dirname,
  pkg,
})
