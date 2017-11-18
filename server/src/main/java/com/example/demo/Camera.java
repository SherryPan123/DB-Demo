package com.example.demo;

/**
 * Created by sherry on 17-11-18.
 */
public class Camera {

    private int id;
    private String type; //相机型号，如iphone

    public Camera(int id, String type) {
        this.id = id;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
