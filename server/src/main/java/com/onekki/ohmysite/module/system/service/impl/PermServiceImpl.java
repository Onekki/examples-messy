package com.onekki.ohmysite.module.system.service.impl;

import com.onekki.ohmysite.core.resp.EResp;
import com.onekki.ohmysite.core.resp.IConstant;
import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.entity.Perm;
import com.onekki.ohmysite.module.system.entity.PermView;
import com.onekki.ohmysite.module.system.entity.User;
import com.onekki.ohmysite.module.system.mapper.PermMapper;
import com.onekki.ohmysite.module.system.service.IPermService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
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
public class PermServiceImpl extends ServiceImpl<PermMapper, Perm> implements IPermService {

    @Override
    public Resp tListBySU() {
        Session session = SecurityUtils.getSubject().getSession();
        User user = (User) session.getAttribute(IConstant.SESSION_USER_INFO);
        try {
            List<Perm> permList = getBaseMapper().listByRid(user.getRid());
            session.setAttribute(IConstant.SESSION_USER_PERMS, permList);
            return Resp.ok(permList);
        } catch (Exception e) {
            return Resp.error(EResp.ERROR_UNAUTHORIZED);
        }
    }

    @Override
    public Resp vList() {
        return Resp.resp(getBaseMapper().listView());
    }
}
