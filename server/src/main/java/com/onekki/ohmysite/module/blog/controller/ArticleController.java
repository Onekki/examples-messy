package com.onekki.ohmysite.module.blog.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.onekki.ohmysite.core.resp.Resp;
import com.onekki.ohmysite.module.blog.entity.Article;
import com.onekki.ohmysite.module.blog.service.IArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author onekki
 * @since 2019-09-07
 */
@RestController
@RequestMapping("/blog/article")
public class ArticleController {

    @Autowired
    private IArticleService articleService;

    /**
     * CURD
     */

    @RequestMapping("/pageView")
    public Resp pageView(@RequestParam Integer current,
                         @RequestParam Integer size,
                         @RequestParam String skey) {
        return articleService.tPage(new Page(current, size), skey);
    }

    @PostMapping("/save")
    public Resp save(@RequestBody Article article) {
        return articleService.tSave(article);
    }

    @PostMapping("/update")
    public Resp update(@RequestBody Article article) {
        return articleService.tUpdate(article);
    }
}
