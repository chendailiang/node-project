class ResModel {
    constructor({ code, data, message }) {
        this.code = code
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
            code: 0,
            data: data
        })
    }

    errorRes({ code, message }) {
        return new ResModel({
            code,
            message
        })
    }
}


module.exports = BasicController