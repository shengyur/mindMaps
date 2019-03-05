import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input:"src/main.js",//必填
    output:{
        file:'bundle.js',//必填
        format:'cjs'//必填
    },
    plugins:[
        resolve(),
        babel({
            exclude:'node_modules/**'
        })
    ]
}