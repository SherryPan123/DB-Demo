package com.example.demo;

/**
 * Created by sherry on 17-11-18.
 */
public class UserDetail {

    private int id;
    private String username;
    private String realname;
    private String address;

    public UserDetail(int id, String username, String realname, String address) {
        this.id = id;
        this.username = username;
        this.realname = realname;
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
