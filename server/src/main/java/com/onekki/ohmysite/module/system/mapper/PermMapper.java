package com.onekki.ohmysite.module.system.mapper;

import com.onekki.ohmysite.module.system.entity.Perm;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.onekki.ohmysite.module.system.entity.PermView;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
public interface PermMapper extends BaseMapper<Perm> {
    List<Perm> listByRid(int rid);
    List<PermView> listView();
}
