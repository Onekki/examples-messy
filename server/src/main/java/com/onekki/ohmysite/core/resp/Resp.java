package com.onekki.ohmysite.core.resp;

public class Resp {
    private int code;
    private String msg;
    private Object obj;

    public Resp(int code, String msg, Object obj) {
        this.code = code;
        this.msg = msg;
        this.obj = obj;
    }

    //resp
    public static Resp resp(Object obj) {
        if (obj != null) return ok(obj);
        else return error();
    }
    public static Resp resp(Boolean bool) {
        if (bool) return ok();
        else return error();
    }

    //ok
    public static Resp ok(Object obj) {
        return new Resp(EResp.OK.getCode(), EResp.OK.getMsg(), obj);
    }
    public static Resp ok() {
        return ok(null);
    }

    //error
    public static Resp error(EResp eResp, Object obj) {
        return new Resp(eResp.getCode(), eResp.getMsg(), obj);
    }
    public static Resp error(EResp eResp) {
        return error(eResp, null);
    }
    public static Resp error(String msg) {
        return new Resp(EResp.ERROR.getCode(), msg, null);
    }
    public static Resp error() {
        return error(EResp.ERROR.getMsg());
    }


    public Resp setCode(int code) {
        this.code = code;
        return this;
    }

    public Resp setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public Resp setObj(Object obj) {
        this.obj = obj;
        return this;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public Object getObj() {
        return obj;
    }

    public String toJson() {
        return "{\"code\":" + code + ",\"message\":\"" + msg + "\"}";
    }
}
