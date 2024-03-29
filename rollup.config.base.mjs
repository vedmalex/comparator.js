import ts from 'rollup-plugin-ts'
import replace from '@rollup/plugin-replace'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { builtinModules } from 'module'
import path from 'node:path'

/**
 * Create a base rollup config
 * @param {Record<string,any>} pkg Imported package.json
 * @param {string} root Imported package.json
 * @param {string[]} external Imported package.json
 * @param {Array<{find: string, replacement: string}>} aliases replace paths for project
 * @param {string} input filename
 * @param {string} tsconfig filename
 * @param {string} macro defines
 * @returns {import('rollup').RollupOptions}
 */
export function createConfig({
  pkg,
  root,
  // aliases,
  tsconfig = 'tsconfig.json',
  external = [],
  input = 'src/index.ts',
  macro = {
    PRODUCTION: process.env.NODE_ENV == 'production',
  },
}) {
  const useTS = /tsx?$/.test(path.parse(input).ext)

  const config = path.join(root, tsconfig)
  console.log(config)
  const plugins = useTS
    ? [
        tsConfigPaths(),
        replace({
          preventAssignment: true,
          ...macro,
        }),
        ts({
          tsconfig: config,
          transformers: 'swc',
        }),
      ]
    : [resolve(), commonjs()]

  const output = []
  if (pkg.main) {
    output.push({
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      footer: 'module.exports = Object.assign(exports.default, exports);',
    })
  }

  if (pkg.module) {
    output.push({
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      plugins: [emitModulePackageFile()],
    })
  }

  return {
    input,
    external: Object.keys(pkg.dependencies || {})
      .concat(Object.keys(pkg.peerDependencies || {}))
      .concat(builtinModules)
      .concat(external),
    output,
    plugins,
  }
}

export function emitModulePackageFile() {
  return {
    name: 'emit-module-package-file',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'package.json',
        source: `{"type":"module"}`,
      })
    },
  }
}
