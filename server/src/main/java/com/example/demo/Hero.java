package com.example.demo;

/**
 * Created by sherry on 17-11-17.
 */
public class Hero {

    private int id;
    private String name;

    Hero(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
