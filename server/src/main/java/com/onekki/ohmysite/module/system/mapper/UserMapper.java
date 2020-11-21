package com.onekki.ohmysite.module.system.mapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.onekki.ohmysite.module.system.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.onekki.ohmysite.module.system.entity.UserView;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
public interface UserMapper extends BaseMapper<User> {
    Page<UserView> pageView(Page page, String skey);
}
