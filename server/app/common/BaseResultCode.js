class BaseResultCode {
    constructor(code, desc) {
        this.code = code;
        this.desc = desc;
    }

    toString() {
        return `Code: ${this.code}, Description: ${this.desc}`;
    }

    static codes = new Map();

    static addCustomCode(key, code, desc) {
        BaseResultCode.codes.set(key, new BaseResultCode(code, desc));
    }

    static getCodeByKey(key) {
        return BaseResultCode.codes.get(key);
    }
}

// 初始结果码定义
BaseResultCode.addCustomCode('SUCCESS', 200, 'success');
BaseResultCode.addCustomCode('FAILED', 500, 'failed');
BaseResultCode.addCustomCode('VALIDATE_FAILED', 400, '参数校验失败');
BaseResultCode.addCustomCode('API_NOT_FOUND', 404, '接口不存在');
BaseResultCode.addCustomCode('API_BUSY', 429, '操作过于频繁');

module.exports = BaseResultCode;