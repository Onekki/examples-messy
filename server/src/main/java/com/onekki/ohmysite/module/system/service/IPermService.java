package com.onekki.ohmysite.module.system.service;

import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.system.entity.Perm;
import com.baomidou.mybatisplus.extension.service.IService;
import com.onekki.ohmysite.module.system.entity.PermView;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author onekki
 * @since 2019-09-05
 */
public interface IPermService extends IService<Perm> {
    Resp tListBySU();
    Resp vList();
}
