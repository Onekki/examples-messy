package com.onekki.ohmysite.module.system.controller;


import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.entity.*;
import com.onekki.ohmysite.module.system.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
@RestController
@RequestMapping("/system/role")
public class RoleController {
    @Autowired
    private IRoleService roleService;

    /**
     * CURD
     */
    @RequestMapping("/listView")
    public Resp listView() {
        return roleService.vList();
    }

    @PostMapping("/save")
    public Resp save(@RequestBody RoleReq roleReq) {
        return roleService.vSave(roleReq);
    }

    @PostMapping("/update")
    public Resp update(@RequestBody RoleReq roleReq) {
        return roleService.vUpdate(roleReq);
    }

    @RequestMapping("/remove")
    public Resp remove(@RequestParam Integer id) {
        return roleService.tRemove(id);
    }
}
