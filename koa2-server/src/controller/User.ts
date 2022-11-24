import BasicController from './BasicController'
import jwt from '../middleware/jwt'

class User extends BasicController {

    async login(
        userName:string,
        password:string
    ) {
        return this.successRes({
            token: jwt.sign({
                name: 'chendl'
            })
        })
    }
}


export default new User()