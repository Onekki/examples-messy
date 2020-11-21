package com.onekki.ohmysite.module.blog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author onekki
 * @since 2019-09-07
 */
@TableName("t_blog_comment")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 评论内容
     */
    private String content;

    /**
     * 评论时间
     */
    private LocalDateTime publishTime;

    /**
     * 0=回复文章 其他=回复某个人的评论
     */
    private Integer replyUid;

    /**
     * 评论者
     */
    private Integer uid;

    /**
     * 评论的文章
     */
    private Integer aid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public LocalDateTime getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(LocalDateTime publishTime) {
        this.publishTime = publishTime;
    }
    public Integer getReplyUid() {
        return replyUid;
    }

    public void setReplyUid(Integer replyUid) {
        this.replyUid = replyUid;
    }
    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }
    public Integer getAid() {
        return aid;
    }

    public void setAid(Integer aid) {
        this.aid = aid;
    }

    @Override
    public String toString() {
        return "Comment{" +
            "id=" + id +
            ", content=" + content +
            ", publishTime=" + publishTime +
            ", replyUid=" + replyUid +
            ", uid=" + uid +
            ", aid=" + aid +
        "}";
    }
}
