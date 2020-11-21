package com.onekki.ohmysite.module.blog.service.impl;

import com.onekki.ohmysite.module.blog.entity.Comment;
import com.onekki.ohmysite.module.blog.mapper.CommentMapper;
import com.onekki.ohmysite.module.blog.service.ICommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
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
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements ICommentService {

}
