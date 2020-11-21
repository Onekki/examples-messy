package com.onekki.ohmysite.module.blog.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.blog.entity.Article;
import com.onekki.ohmysite.module.blog.entity.ArticleView;
import com.onekki.ohmysite.module.blog.mapper.ArticleMapper;
import com.onekki.ohmysite.module.blog.service.IArticleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author onekki
 * @since 2019-09-07
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements IArticleService {

    @Override
    public Resp tPage(Page page, String skey) {
        return Resp.resp(getBaseMapper().pageView(page, skey));
    }

    @Override
    public Resp tSave(Article article) {
        return Resp.resp(this.save(article));
    }

    @Override
    public Resp tUpdate(Article article) {
        return Resp.resp(this.updateById(article));
    }
}
