package com.onekki.ohmysite.module.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.onekki.ohmysite.core.resp.EResp;
import com.onekki.ohmysite.core.resp.IConstant;
import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.entity.User;
import com.onekki.ohmysite.module.system.entity.UserView;
import com.onekki.ohmysite.module.system.mapper.UserMapper;
import com.onekki.ohmysite.module.system.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Override
    public Resp tLogin(String username, String password) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        try {
            subject.login(token);
            QueryWrapper<User> qw = new QueryWrapper<>();
            qw.eq("username", username);
            qw.eq("password", password);
            User user = this.getOne(qw);
            user.setPassword(null);
            subject.getSession().setAttribute(IConstant.SESSION_USER_INFO, user);
            return Resp.resp(user);
        } catch (AuthenticationException e) {
            return Resp.error(EResp.ERROR_NOT_ACCEPTABLE);
        }
    }

    @Override
    public Resp vPage(Page page, String skey) {
        return Resp.resp(getBaseMapper().pageView(page, skey));
    }

    @Override
    public Resp tSave(User user) {
        return Resp.resp(this.save(user));
    }

    @Override
    public Resp tUpdate(User user) {
        return Resp.resp(this.updateById(user));
    }

    @Override
    public Resp tRemove(Integer id) {
        return Resp.resp(this.removeById(id));
    }

}
