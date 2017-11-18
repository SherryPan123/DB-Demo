package com.example.demo;

import java.util.List;

/**
 * Created by sherry on 17-11-18.
 */
public class PhotoDetail {

    private int id;
    private String path; //图片存储的路径
    private String description; //图片描述
    private List<Comment> commentList; //评论

    private int votes; //根据用户名和图片哈希得到的点赞数
    private int views; //根据用户名和图片哈希（不同上）得到的被查看次数
    private String firstLetter; //上传图片用户名字的首字母，用于生成头像
    private String background_color; //根据用户名哈希得到的背景色，用于生成头像

    public PhotoDetail(int id, String path, String description, List<Comment> commentList, int votes, int views, String firstLetter, String background_color) {
        this.id = id;
        this.path = path;
        this.description = description;
        this.commentList = commentList;
        this.votes = votes;
        this.views = views;
        this.firstLetter = firstLetter;
        this.background_color = background_color;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getVotes() {
        return votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    public String getFirstLetter() {
        return firstLetter;
    }

    public void setFirstLetter(String firstLetter) {
        this.firstLetter = firstLetter;
    }

    public String getBackground_color() {
        return background_color;
    }

    public void setBackground_color(String background_color) {
        this.background_color = background_color;
    }
}
