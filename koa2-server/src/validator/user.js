
const _validate = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            maxLength: 255,
            minLength: 11
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        }
    }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
    return _validate(SCHEMA, data)
}

module.exports = userValidate