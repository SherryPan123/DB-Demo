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

    @GetMapping("/timeline")
    public UserDetail[] searchUserDetail(@RequestParam("userId") String userId) {
        UserDetail[] userDetails = new UserDetail[1];
        String path = "/home/sherry/Desktop/photos/1.jpg";
        String image = "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path));
        userDetails[0] = new UserDetail(1, "XiaoMing", "小明", "上海市浦东新区", image);
        return userDetails;
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
        List<User> results = new ArrayList<>();
        results.add(new User(1, "Panningting", 10));
        results.add(new User(2, "wujiaye", 10));
        results.add(new User(3, "yeye", 10));
        results.add(new User(4, "ningning", 10));
        return results;
    }

    @GetMapping("/timeline_photos")
    public List<PhotoDetail> searchPhotosByUser(@RequestParam("userId") String userId) {
        // 根据用户Id搜索该用户基本信息和他发布的所有图片
        // 以JSON格式返回UserDetail + List<PhotoDetail>
        List<PhotoDetail> photoDetails = new ArrayList<>();
        String path1 = "/home/sherry/Desktop/photos/1.jpg";
        String path2 = "/home/sherry/Desktop/photos/2.jpg";
        String path3 = "/home/sherry/Desktop/photos/3.jpg";
        photoDetails.add(new PhotoDetail(1, "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path1))));
        photoDetails.add(new PhotoDetail(2, "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path2))));
        photoDetails.add(new PhotoDetail(3, "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path3))));
        photoDetails.add(new PhotoDetail(4, "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path2))));
        photoDetails.add(new PhotoDetail(5, "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path1))));
        photoDetails.add(new PhotoDetail(6, "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path3))));
        photoDetails.add(new PhotoDetail(7, "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path2))));
        photoDetails.add(new PhotoDetail(8, "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(path2))));
        return photoDetails;
    }
     /*
        以JSON格式返回如下：
        [{"name":"iphone","data":[1,2,3,4,5,6,7,8,9,10,11,12]},
         {"name":"iphone","data":[1,2,3,4,5,6,7,8,9,10,11,12]},
         {……}]
    */
    @GetMapping("/statistic/photos")
    public String searchPhotoNumberByCameraYear(
            @RequestParam(name = "year", defaultValue = "2017") String year,
            @RequestParam(name = "cameras", required = false) String camerasStr) {
        // 根据起始年份月份搜索相机对应的照片数量，如2013，即搜索2013从1月到12月的相机对应照片数量 -> lineChart
        System.out.println(year);
        String[] cameras = camerasStr.split(",");
        for (int i=0; i<cameras.length; i++) {
            System.out.println(cameras[i]);
        }
        return "[{\"name\":\"iphone\",\"data\":[1.2,5.2,12.2,9.3,7.7,14.2,1.2,7.2,12.2,6.3,7.7,14.2]}," +
                "{\"name\":\"sansung\",\"data\":[-1.2,5.2,12.2,6.3,9.7,18.2,1.2,3.2,12.2,6.3,4.7,12.2]}," +
                "{\"name\":\"mi\",\"data\":[5.2,7.2,6.2,6.3,9.7,12.2,1.2,5.2,12.2,6.3,9.7,4.2]}]";
    }

    @GetMapping("/statistic/cameras")
    public String searchCameraPercentByCameraYear(
            @RequestParam(name = "year", defaultValue = "2017") String year,
            @RequestParam(name = "cameras", required = false) String camerasStr) {
        // 统计在这一年中几种相机拍摄照片分别占比 -> pieChart
        System.out.println(year);
        String[] cameras = camerasStr.split(",");
        for (int i=0; i<cameras.length; i++) {
            System.out.println(cameras[i]);
        }
        return "[{\"name\":\"iphone\",\"y\":23.6}," +
                "{\"name\":\"sansung\",\"y\":15.2}," +
                "{\"name\":\"Huawei\",\"y\":9.2}," +
                "{\"name\":\"Nokia\",\"y\":7.2}," +
                "{\"name\":\"mi\",\"y\":2.2}," +
                "{\"name\":\"DENSO\",\"y\":10.2}," +
                "{\"name\":\"Acer\",\"y\":4.2}," +
                "{\"name\":\"Panasonnic\",\"y\":2.2}," +
                "{\"name\":\"Canon\",\"y\":6.2}," +
                "{\"name\":\"others\",\"y\":19.8}]";
    }

    @GetMapping("/statistic/photosOfCities")
    public String searchPhotoNumberByCitiesYear(
            @RequestParam(name = "year", defaultValue = "2017") String year,
            @RequestParam(name = "cities", required = false) String citiesStr) {
        // 统计在这一年中几种相机拍摄照片分别占比 -> pieChart
//        System.out.println(year);
//        String[] cities = citiesStr.split(",");
//        for (int i=0; i<cities.length; i++) {
//            System.out.println(cities[i]);
//        }
        return "[{\"name\":\"Shanghai\",\"data\":[1.2,5.2,12.2,9.3,7.7,14.2,1.2,7.2,12.2,6.3,7.7,14.2]}," +
                "{\"name\":\"NewYork\",\"data\":[-1.2,5.2,12.2,6.3,9.7,18.2,1.2,3.2,12.2,6.3,4.7,12.2]}," +
                "{\"name\":\"London\",\"data\":[5.2,7.2,6.2,6.3,9.7,12.2,1.2,5.2,12.2,6.3,9.7,4.2]}]";
    }

}
