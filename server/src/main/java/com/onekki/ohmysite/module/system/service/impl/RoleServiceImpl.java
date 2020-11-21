package com.onekki.ohmysite.module.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.entity.*;
import com.onekki.ohmysite.module.system.mapper.RoleMapper;
import com.onekki.ohmysite.module.system.service.IRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

    @Autowired
    private RolePermServiceImpl rolePermService;

    @Override
    public Resp vList() {
        return Resp.resp(getBaseMapper().listView());
    }

    @Override
    public Resp vSave(RoleReq roleReq) {
        Role role = new Role();
        role.setId(roleReq.getId());
        role.setName(roleReq.getName());
        if (!this.save(role)) {
            return Resp.error("角色保存失败");
        }
        QueryWrapper<Role> qw = new QueryWrapper<>();
        qw.eq("name", role.getName());
        Role _role = this.getOne(qw);
        if (_role == null) {
            return Resp.error("角色查询失败");
        }
        RolePerm rolePerm = new RolePerm();
        rolePerm.setRid(_role.getId());
        for (Integer pid : roleReq.getPidSet()) {
            rolePerm.setPid(pid);
            if (!rolePermService.save(rolePerm)) {
                return Resp.error("角色权限保存失败");
            }
        }
        return Resp.ok();
    }

    @Override
    public Resp vUpdate(RoleReq roleReq) {
        Role _role = this.getById(roleReq.getId());
        _role.setName(roleReq.getName());
        QueryWrapper<RolePerm> qw = new QueryWrapper<>();
        qw.eq("rid", _role.getId());

        List<RolePerm> rolePermList = rolePermService.list(qw);
        RolePerm rolePerm = new RolePerm();
        rolePerm.setRid(_role.getId());

        // 保存旧权限列表没有新权限列表里有的权限
        for (Integer pid : roleReq.getPidSet()) {
            boolean currentSave = true;
            for (int i = 0; i < rolePermList.size(); i++) {
                if (pid.equals(rolePermList.get(i).getPid())) {
                    currentSave = false;
                    continue;
                }
            }
            if (currentSave) {
                rolePerm.setPid(pid);
                if (!rolePermService.save(rolePerm)) {
                    return Resp.error("角色权限保存失败");
                }
            }
        }

        // 删除旧权限列表里有新权限列表里没有的权限
        for (int i = 0; i < rolePermList.size(); i++) {
            boolean currentRemove = true;
            for (Integer pid : roleReq.getPidSet()) {
                if (pid.equals(rolePermList.get(i).getPid())) {
                    currentRemove = false;
                    continue;
                }
            }
            if (currentRemove) {
                if (!rolePermService.removeById(rolePermList.get(i).getId())) {
                    return Resp.error("角色权限删除失败");
                }
            }
        }
        return Resp.ok();
    }

    @Override
    public Resp tRemove(Integer id) {
        QueryWrapper<RolePerm> qw = new QueryWrapper<>();
        qw.eq("rid", id);
        if (!rolePermService.remove(qw)) {
            return Resp.error("角色权限删除失败");
        }
        return Resp.resp(this.removeById(id));
    }
}
