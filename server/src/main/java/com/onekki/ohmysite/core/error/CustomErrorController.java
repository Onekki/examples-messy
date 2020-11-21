package com.onekki.ohmysite.core.error;

import com.onekki.ohmysite.core.resp.EResp;
import com.onekki.ohmysite.core.resp.Resp;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by onekki
 * Created on 2019/8/30
 */
@RestController
public class CustomErrorController implements ErrorController {
    @RequestMapping("/error")
    Resp handleError() {
        return Resp.error(EResp.ERROR_NOT_FOUND);
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
