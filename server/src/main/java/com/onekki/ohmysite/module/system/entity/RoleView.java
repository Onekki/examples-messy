package com.onekki.ohmysite.module.system.entity;

import java.util.Set;

/**
 * Created by onekki
 * Created on 2019/9/5
 */
public class RoleView {
    private Integer id;
    private String name;
    private Set<PermView> permViewSet;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<PermView> getPermViewSet() {
        return permViewSet;
    }

    public void setPermViewSet(Set<PermView> permViewSet) {
        this.permViewSet = permViewSet;
    }

    @Override
    public String toString() {
        String permViewSetString = "";
        if (permViewSet != null) {
            for (PermView permView : permViewSet) {
                permViewSetString += permView.toString();
            }
        }
        return "RoleView{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", permViewSet=" + permViewSet + ":" + permViewSetString +
                '}';
    }
}
