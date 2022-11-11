class ResModel {
    constructor({ errno, data, message }) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}


class BasicController {
    successRes(data = {}) {
        return new ResModel({
            errno: 0,
            data: data
        })
    }

    errorRes({ errno, message }) {
        return new ResModel({
            errno,
            message
        })
    }
}


module.exports=BasicController