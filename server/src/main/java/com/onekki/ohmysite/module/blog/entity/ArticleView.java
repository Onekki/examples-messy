package com.onekki.ohmysite.module.blog.entity;

import com.onekki.ohmysite.module.system.entity.User;

import java.time.LocalDateTime;

/**
 * Created by onekki
 * Created on 2019/9/7
 */
public class ArticleView {
    private Integer id;
    private String title;
    private String summary;
    private String mdUrl;
    private String html;
    private LocalDateTime publishTime;
    private LocalDateTime editTime;
    private Integer state;
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ArticleView{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", summary='" + summary + '\'' +
                ", mdUrl='" + mdUrl + '\'' +
                ", html='" + html + '\'' +
                ", publishTime=" + publishTime +
                ", editTime=" + editTime +
                ", state=" + state +
                ", user=" + user +
                '}';
    }
}
