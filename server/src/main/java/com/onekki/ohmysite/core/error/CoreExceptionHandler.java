package com.onekki.ohmysite.core.error;

import com.onekki.ohmysite.core.resp.EResp;
import com.onekki.ohmysite.core.resp.Resp;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by onekki
 * Created on 2019/8/30
 */

@ControllerAdvice
@ResponseBody
public class CoreExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Resp defaultExceptionHandler(HttpServletRequest request, Exception e) {
        String errorPos = "";
        if (e.getStackTrace().length > 0) {
            StackTraceElement element = e.getStackTrace()[0];
            e.printStackTrace();
            String fileName = element.getFileName() == null ? "未找到出错文件" : element.getFileName();
            int lineNumber = element.getLineNumber();
            errorPos = fileName + ":" +lineNumber;
        }
        return Resp.error(EResp.ERROR_INTERNAL_SERVER_ERROR, errorPos);
    }

    /**
     * GET/POST请求方法错误的拦截器
     * 因为开发时可能比较常见,而且发生在进入controller之前,上面的拦截器拦截不到这个错误
     * 所以定义了这个拦截器
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public Resp httpRequestMethodExceptionHandler() {
        return Resp.error(EResp.ERROR_METHOD_NOT_ALLOWED);
    }

    /**
     * 本系统自定义错误的拦截器
     * 拦截到此错误之后,就返回这个类里面的json给前端
     * 常见使用场景是参数校验失败,抛出此错,返回错误信息给前端
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public Resp missingServletRequestParameterExceptionHandler(MissingServletRequestParameterException e) {
        return Resp.error(EResp.ERROR_PRECONDITION_FAILED, e.getMessage());
    }

    /**
     * 权限不足报错拦截
     */
    @ExceptionHandler(UnauthorizedException.class)
    public Resp unauthorizedExceptionHandler() {
        return Resp.error(EResp.ERROR_UNAUTHORIZED);
    }

    /**
     * 未登录报错拦截
     * 在请求需要权限的接口,而连登录都还没登录的时候,会报此错
     */
    @ExceptionHandler(UnauthenticatedException.class)
    public Resp unauthenticatedExceptionHandler() {
        return Resp.error(EResp.ERROR_UNAUTHORIZED);
    }
}
