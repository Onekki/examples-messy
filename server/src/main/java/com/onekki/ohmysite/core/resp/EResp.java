package com.onekki.ohmysite.core.resp;

/**
 * Created by onekki
 * Created on 2019/8/30
 */
public enum EResp {
    OK(200, "请求成功"),
    ERROR(0, "操作失败"),
    ERROR_BAD_REQUEST(400, "客户端请求错误"),
    ERROR_UNAUTHORIZED(401, "未登录或权限不足"),
    ERROR_FORBIDDEN(403, "拒绝请求"),
    ERROR_NOT_FOUND(404, "资源不存在"),
    ERROR_METHOD_NOT_ALLOWED(405, "请求方式有误, 请检查GET/POST"),
    ERROR_NOT_ACCEPTABLE(406, "验证失败"),
    ERROR_PRECONDITION_FAILED(412, "缺少头信息或请求参数"),
    ERROR_INTERNAL_SERVER_ERROR(500, "服务器内部错误");

    private int code;
    private String msg;

    EResp(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
