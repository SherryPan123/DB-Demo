package com.example.demo;

/**
 * Created by sherry on 17-11-18.
 */
public class Photo {

    private int id;
    private String image; //图片存储的路径

    public Photo(int id, String image) {
        this.id = id;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
