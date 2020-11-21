package com.onekki.ohmysite.module.system.entity;

import java.util.Set;

/**
 * Created by onekki
 * Created on 2019/9/5
 */
public class PermView {
    private String title;
    private Set<Perm> permSet;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Perm> getPermSet() {
        return permSet;
    }

    public void setPermSet(Set<Perm> permSet) {
        this.permSet = permSet;
    }

    @Override
    public String toString() {
        return "PermView{" +
                "title='" + title + '\'' +
                ", permSet=" + permSet +
                '}';
    }
}
