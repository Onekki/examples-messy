package com.onekki.ohmysite.module.system.mapper;

import com.onekki.ohmysite.module.system.entity.Role;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.onekki.ohmysite.module.system.entity.RoleView;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
public interface RoleMapper extends BaseMapper<Role> {
    List<RoleView> listView();
}
