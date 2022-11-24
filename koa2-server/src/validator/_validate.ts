import Ajv from 'ajv'

const ajv = new Ajv({
    allErrors: true // 输出所有的错误（比较慢）
})

function validate(schema:any, data={}){
    const valid = ajv.validate(schema, data)
    if(!valid){
        return ajv.errors?.[0]
    }
}
export default validate