import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
    entry:'src/index.js',
    format:'umd',//兼容各个模块化规范
    plugins:[
        resolve(),
        babel({
            exclude:'node_modules/**'
        })
    ],
    dest:'build/bundle.js'
}