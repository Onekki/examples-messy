package com.onekki.ohmysite.shiro;

import com.onekki.ohmysite.core.resp.EResp;
import com.onekki.ohmysite.core.resp.Resp;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class PermAuthFilter extends FormAuthenticationFilter {

    //对没有登录的请求进行拦截, 全部返回json信息. 覆盖掉shiro原本的跳转login.jsp的拦截方式
    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {

        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setCharacterEncoding("UTF-8");
        httpServletResponse.setContentType("application/json");
        PrintWriter pw = response.getWriter();
        try {
            Resp resp = Resp.error(EResp.ERROR_UNAUTHORIZED);
            pw.println(resp.toJson());
        } finally {
            pw.flush();
            pw.close();
        }
        return false;
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean(PermAuthFilter filter) {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(filter);
        filterRegistrationBean.setEnabled(false);
        return filterRegistrationBean;
    }
}
