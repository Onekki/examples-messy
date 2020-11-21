package com.onekki.ohmysite.module.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.entity.RoleView;
import com.onekki.ohmysite.module.system.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.onekki.ohmysite.module.system.entity.UserView;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
public interface IUserService extends IService<User> {
    Resp tLogin(String username, String password);
    Resp vPage(Page page, String skey);
    Resp tSave(User user);
    Resp tUpdate(User user);
    Resp tRemove(Integer id);
}
