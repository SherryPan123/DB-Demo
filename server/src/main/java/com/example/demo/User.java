package com.example.demo;

/**
 * Created by sherry on 17-11-18.
 */
public class User {

    private int id;
    private String name;
    private int numberOfPhotos; //该用户发表的照片总数

    public User(int id, String name, int numberOfPhotos) {
        this.id = id;
        this.name = name;
        this.numberOfPhotos = numberOfPhotos;
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

    public int getNumberOfPhotos() {
        return numberOfPhotos;
    }

    public void setNumberOfPhotos(int numberOfPhotos) {
        this.numberOfPhotos = numberOfPhotos;
    }
}
