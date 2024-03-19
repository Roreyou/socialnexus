class BaseResultCode {
    //code
    code;
    //说明
    desc;

    constructor(code, desc) {//构造函数
        this.code = code;
        this.desc = desc;
    }

    /************************************/
    static SUCCESS = new BaseResultCode(200, 'success');
    static FAILED = new BaseResultCode(500, 'failed');
    // static VALIDATE_FAILED = new BaseResultCode(400, '参数校验失败');
    // static API_NOT_FOUNT = new BaseResultCode(404, '接口不存在');
    // static API_BUSY = new BaseResultCode(429, '操作过于频繁')
}

module.exports = BaseResultCode
