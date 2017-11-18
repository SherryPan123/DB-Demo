package com.example.demo;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by sherry on 17-11-18.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ReferenceController {

    @GetMapping("/photos")
    public List<Photo> searchPhotos(@RequestParam("term") String term) {
        // 根据关键字搜图片（模糊搜索）,如搜城市、搜描述、搜相机
        List<Photo> photos = new ArrayList<>();
        for (int i=1; i<=8; i++) {
            String path = "/home/sherry/Desktop/photos/"+i+".jpg";
            String content = "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path));
            photos.add(new Photo(i, content));
        }
        return photos;
    }

    private String encodeFileToBase64Binary(File file) {
        String encodedfile = null;
        try {
            FileInputStream fileInputStreamReader = new FileInputStream(file);
            byte[] bytes = new byte[(int)file.length()];
            fileInputStreamReader.read(bytes);
            encodedfile = new String(Base64.encodeBase64(bytes), "UTF-8");
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return encodedfile;
    }

    @GetMapping("/users")
    public List<User> searchUsers(@RequestParam("term") String term) {
        // 根据关键字搜用户（模糊搜索）
        return null;
    }

    @GetMapping("/user")
    public String searchPhotosByUser(@RequestParam("userId") int userId) {
        // 根据用户Id搜索该用户基本信息和他发布的所有图片
        // 以JSON格式返回UserDetail + List<PhotoDetail>
        return null;
    }

    @GetMapping("/cameras")
    public List<Camera> searchCamerasTop10() {
        // 搜对应照片数最多的相机（前10个）
        return null;
    }

    @GetMapping("/statistic")
    public String statistic(@RequestParam("year") String year) {
        // 根据起始年份月份搜索相机对应的照片数量，如2013，即搜索2013从1月到12月的相机对应照片数量 -> lineChart
        // 统计在这一年中几种相机拍摄照片分别占比 -> pieChart
        // 以JSON格式返回如下：
        /*
        {"lineChart":[{"type":"iphone","numberOfPhotos":[1,2,3,4,5,6,7,8,9,10,11,12]},
                     {"type":"iphone","numberOfPhotos":[1,2,3,4,5,6,7,8,9,10,11,12]},
                     {……}],
         "pieChart":[{"type":"Iphone", "percent":"20%"},{"type":"Samsung","percent":"15%"},{……}]
         }
         */
        return null;
    }

}
