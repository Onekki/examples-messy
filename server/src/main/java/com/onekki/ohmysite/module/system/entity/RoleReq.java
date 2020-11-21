package com.onekki.ohmysite.module.system.entity;

import java.util.Set;

/**
 * Created by onekki
 * Created on 2019/9/7
 */
public class RoleReq {
    private Integer id;
    private String name;
    private Set<Integer> pidSet;

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

    public Set<Integer> getPidSet() {
        return pidSet;
    }

    public void setPidSet(Set<Integer> pidSet) {
        this.pidSet = pidSet;
    }
}
