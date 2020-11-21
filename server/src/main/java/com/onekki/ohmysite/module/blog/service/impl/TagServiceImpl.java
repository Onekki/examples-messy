package com.onekki.ohmysite.module.blog.service.impl;

import com.onekki.ohmysite.module.blog.entity.Tag;
import com.onekki.ohmysite.module.blog.mapper.TagMapper;
import com.onekki.ohmysite.module.blog.service.ITagService;
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
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements ITagService {

}
