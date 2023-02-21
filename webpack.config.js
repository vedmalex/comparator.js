const path = require('path')
const webpack = require('webpack')
const TsMacros = require('ts-macros').default
const DtsBundleWebpack = require('dts-bundle-webpack')
const nodeExternals = require('webpack-node-externals')

/**
 * @enum {string}
 */
const Target = {
  web: 'umd',
  node: 'commonjs',
  esm: 'module',
  amd: 'amd',
}

const dtsOptions = {
  // name of module like in package.json
  name: 'ts-template',
  main: 'types/**/*.d.ts',
  out: '../dist/index.d.ts',
  referenceExternals: true,
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const targets = env.targets?.split(',') ?? ['node']
  const noclean = env.noclean
  /**
   * @return {()=>import('webpack').Configuration}
   * @param {Target} target
   * @param {number} index
   */
  function makeConfig(target, index) {
    const isWeb = target == 'web'
    if (!Target[target]) throw new Error(`unexpected target ${target}`)
    console.log(`target = ${target}`)

    const plugins = [
      new webpack.DefinePlugin({
        // для того чтобы все эти макро работали нужно добавлять их в /types/global.d.ts
        PROD: isProduction,
        WEB: target == 'web',
      }),
      // упаковывает все типы в один бандл
      new DtsBundleWebpack(dtsOptions),
    ]

    /** @type {()=>import('webpack').Configuration} */
    const config = {
      entry: './src/index.js',
      plugins,
      output: {
        path: path.resolve(__dirname, `dist`),
        library: {
          type: Target[target],
        },
        filename: target == 'node' ? 'index.js' : `index.${Target[target]}.js`,
        clean: index == 0 && !noclean,
      },
      resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          '@DTO': path.resolve(__dirname, 'src/dto'),
        },
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.json'),
                getCustomTransformers: program => ({
                  before: [TsMacros(program)],
                }),
              },
            },
          },
        ],
      },
    }
    if (!isWeb) {
      config.externalsPresets = { node: true }
      config.externals = [nodeExternals()]
    }
    if (!isProduction) {
      config.devtool = 'inline-source-map'
    } else {
      config.devtool = 'source-map'
    }
    if (target == 'esm') {
      if (!config.experiments) config.experiments = {}
      config.experiments.outputModule = true
    }
    return config
  }

  return targets.map(makeConfig)
}
