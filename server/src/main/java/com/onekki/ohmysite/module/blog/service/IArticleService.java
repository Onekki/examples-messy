package com.onekki.ohmysite.module.blog.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.blog.entity.Article;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author onekki
 * @since 2019-09-07
 */
public interface IArticleService extends IService<Article> {
    Resp tPage(Page page, String skey);
    Resp tSave(Article article);
    Resp tUpdate(Article article);
}
