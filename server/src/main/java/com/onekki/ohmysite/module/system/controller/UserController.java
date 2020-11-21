package com.onekki.ohmysite.module.system.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.entity.User;
import com.onekki.ohmysite.module.system.service.IUserService;
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
@RequestMapping("/system/user")
public class UserController {
    @Autowired
    private IUserService userService;

    /**
     *  认证
     */
    @RequestMapping("/login")
    public Resp login(@RequestParam String username,
                      @RequestParam String password) {
       return userService.tLogin(username, password);
    }

    /**
     * CURD
     */
    @RequestMapping("/pageView")
    public Resp pageView(@RequestParam int current, int size, String skey) {
        return userService.vPage(new Page(current, size), skey);
    }

    @PostMapping("/save")
    public Resp save(@RequestBody User user) {
        return userService.tSave(user);
    }

    @PostMapping("/update")
    public Resp update(@RequestBody User user) {
        return userService.tUpdate(user);
    }

    @RequestMapping("/remove")
    public Resp remove(@RequestParam int id) {
        return userService.tRemove(id);
    }
}
