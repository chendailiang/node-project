const BasicController = require('./BasicController')
const { sign } = require('../middleware/jwt')

class User extends BasicController {

    async login({
        userName,
        password
    }) {
        return this.successRes({
            token: sign({
                name: 'chendl'
            })
        })
    }
}


module.exports = new User()