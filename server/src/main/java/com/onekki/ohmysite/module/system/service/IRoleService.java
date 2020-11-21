package com.onekki.ohmysite.module.system.service;

import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.entity.Role;
import com.baomidou.mybatisplus.extension.service.IService;
import com.onekki.ohmysite.module.system.entity.RoleReq;
import com.onekki.ohmysite.module.system.entity.RoleView;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
public interface IRoleService extends IService<Role> {
    Resp vList();
    Resp vSave(RoleReq roleReq);
    Resp vUpdate(RoleReq roleReq);
    Resp tRemove(Integer id);
}
