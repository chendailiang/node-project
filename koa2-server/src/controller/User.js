const BasicController = require('./BasicController')

class User extends BasicController {

    async login({
        userName,
        password
    }) {
        return this.successRes()
    }
}


module.exports = new User()