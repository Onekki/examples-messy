package com.onekki.ohmysite.module.system.controller;


import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.service.IPermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
@RestController
@RequestMapping("/system/perm")
public class PermController {
    @Autowired
    private IPermService permService;

    /**
     * 认证
     */
    @RequestMapping("/listBySU")
    public Resp listBySessionUsername() {
        return permService.tListBySU();
    }

    /**
     * CURD
     */

    @RequestMapping("/listView")
    public Resp listView() {
        return permService.vList();
    }
}
