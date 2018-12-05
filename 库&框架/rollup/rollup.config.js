import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
    input:'src/index.js',
    output:{
        format:'umd',//兼容各个模块化规范
        file:'build/bundle.js'
    },
    plugins:[
        resolve(),
        babel({
            exclude:'node_modules/**'
        })
    ]
}