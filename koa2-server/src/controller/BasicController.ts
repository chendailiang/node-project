class ResModel {

    code: number;
    data?: any;
    message?: string;

    constructor({ code, data, message }: {
        code: number,
        data?: any,
        message?: string
    }) {
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

    errorRes({ code, message }: {
        code: number,
        message?: string
    }) {
        return new ResModel({
            code,
            message
        })
    }
}


export default BasicController