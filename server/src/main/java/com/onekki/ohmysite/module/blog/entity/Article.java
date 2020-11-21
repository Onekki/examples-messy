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
@TableName("t_blog_article")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章概括
     */
    private String summary;

    /**
     * 文章md文件url
     */
    private String mdUrl;

    /**
     * 文章html
     */
    private String html;

    /**
     * 发布日期
     */
    private LocalDateTime publishTime;

    /**
     * 修改日期
     */
    private LocalDateTime editTime;

    /**
     * 文章状态0=草稿 1=发布 2=删除
     */
    private Integer state;

    /**
     * 作者
     */
    private Integer uid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
    public String getMdUrl() {
        return mdUrl;
    }

    public void setMdUrl(String mdUrl) {
        this.mdUrl = mdUrl;
    }
    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }
    public LocalDateTime getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(LocalDateTime publishTime) {
        this.publishTime = publishTime;
    }
    public LocalDateTime getEditTime() {
        return editTime;
    }

    public void setEditTime(LocalDateTime editTime) {
        this.editTime = editTime;
    }
    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + id +
            ", title=" + title +
            ", summary=" + summary +
            ", mdUrl=" + mdUrl +
            ", html=" + html +
            ", publishTime=" + publishTime +
            ", editTime=" + editTime +
            ", state=" + state +
            ", uid=" + uid +
        "}";
    }
}
