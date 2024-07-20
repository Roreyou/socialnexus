const BaseResultCode = require('./BaseResultCode');

class Result {
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    static success(data) {
        const successCode = BaseResultCode.getCodeByKey('SUCCESS');
        return new Result(successCode.code, successCode.desc, data);
    }

    static fail(errData) {
        const failCode = BaseResultCode.getCodeByKey('FAILED');
        return new Result(failCode.code, failCode.desc, errData);
    }

    static validateFailed(param) {
        const validateFailedCode = BaseResultCode.getCodeByKey('VALIDATE_FAILED');
        return new Result(validateFailedCode.code, validateFailedCode.desc, param);
    }

    static bizFail(bizException) {
        return new Result(bizException.code, bizException.msg, null);
    }
}

module.exports = Result;