package com.example.demo;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.AllServiceImpl;

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
@CrossOrigin(origins = "http://10.222.119.205:4200")
public class ReferenceController {
	@Autowired
	private AllServiceImpl allServiceImpl;
	
    @GetMapping("/photos")
    public List<Photo> searchPhotos(@RequestParam("term") String term) {
        // 根据关键字搜图片（模糊搜索）,如搜城市、搜描述、搜相机
        List<Photo> photos = allServiceImpl.findPhotosByterm(term);
        System.out.println(photos.size());
        System.out.println(photos.get(0).getId());
        System.out.println(photos.get(0).getImage().length());
        return photos;
    }

    @GetMapping("/timeline")
    public UserDetail[] searchUserDetail(@RequestParam("userId") String userId) {
    	System.out.println(userId);
        UserDetail[] userDetails = new UserDetail[1];
        userDetails[0] = allServiceImpl.getUserDetailByUserId(userId);
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
        List<User> results = allServiceImpl.getUserListByTerm(term);
        return results;
    }

    @GetMapping("/timeline_photos")
    public List<PhotoDetail> searchPhotosByUser(@RequestParam("userId") String userId) {
        // 根据用户Id搜索该用户基本信息和他发布的所有图片
        // 以JSON格式返回UserDetail + List<PhotoDetail>
    	System.out.println("user Id"+userId);
        List<PhotoDetail> photoDetails = allServiceImpl.getPhotoDetailsByUserId(userId);
        return photoDetails;
    }
     /*
        以JSON格式返回如下：
        [{"name":"iphone","data":[1,2,3,4,5,6,7,8,9,10,11,12]},
         {"name":"iphone","data":[1,2,3,4,5,6,7,8,9,10,11,12]},
         {……}]
    */
    @GetMapping("/statistic/photos")//calculate every camera's photos a year  by month 
    public String searchPhotoNumberByCameraYear(
            @RequestParam(name = "year", defaultValue = "2016") String year,
            @RequestParam(name = "cameras", defaultValue = "iPhone") String camerasStr) {
        // 根据起始年份月份搜索相机对应的照片数量，如2013，即搜索2013从1月到12月的相机对应照片数量 -> lineChart
        System.out.println("year:"+year);
        String[] cameras = camerasStr.split(",");
        for (int i=0; i<cameras.length; i++) {
            System.out.println(cameras[i]);
        }
        
        ArrayList<String> photoPermonth = new ArrayList<String>(); 
        
        
        for (int i=0;i<cameras.length;i++) {
        	String result = "{\"name\":\"";
        	result = result + cameras[i] + "\",\"data\":[";
        	int[] monthNum = allServiceImpl.getPhotoPermonthByCname(year,cameras[i]);
        	for(int j=0;j<11;j++) {
        		result = result + monthNum[j]+",";
        	}
        	result = result + monthNum[11]+"]}";
        	photoPermonth.add(result);   	
        }
         
        String Res = "[";
        for(int i=0;i<photoPermonth.size();i++)
        {
        	if(i!=photoPermonth.size()-1)
        	    Res = Res + photoPermonth.get(i)+",";
        	else
        		Res = Res + photoPermonth.get(i)+"]";
        		
        }
        return Res;
        //a demo
        /*
        return "[{\"name\":\"iphone\",\"data\":[1.2,5.2,12.2,9.3,7.7,14.2,1.2,7.2,12.2,6.3,7.7,14.2]}," +
                "{\"name\":\"sansung\",\"data\":[-1.2,5.2,12.2,6.3,9.7,18.2,1.2,3.2,12.2,6.3,4.7,12.2]}," +
                "{\"name\":\"mi\",\"data\":[5.2,7.2,6.2,6.3,9.7,12.2,1.2,5.2,12.2,6.3,9.7,4.2]}]";
                */
    }

    @GetMapping("/statistic/cameras")//calculate cameras' photo ayear's rate
    public String searchCameraPercentByCameraYear(
            @RequestParam(name = "year", defaultValue = "2016") String year,
            @RequestParam(name = "cameras", defaultValue = "iPhone") String camerasStr) {
        // 统计在这一年中几种相机拍摄照片分别占比 -> pieChart
        System.out.println(year);
        String[] cameras = camerasStr.split(",");
        for (int i=0; i<cameras.length; i++) {
            System.out.println(cameras[i]);
        }
        
        //ArrayList<Double> CameraPhotoPeryear = new ArrayList<Double>();
        double[] cameraRate = new double[200];
        String Res = "[";
        for (int i=0;i<cameras.length;i++) {
        	cameraRate[i]=allServiceImpl.getPhotoPeryearRateByCname(year,cameras[i]);
        	if(i!=cameras.length-1)
        		Res =Res + "{\"name\":\"" + cameras[i]+"\",\"y\":" +cameraRate[i]+"},";
        	else
        		Res =Res + "{\"name\":\"" + cameras[i]+"\",\"y\":" +cameraRate[i]+"}]";
        }
         
        
        return Res;
        /*
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
                */
    }

    @GetMapping("/statistic/photosOfCities")//calculate a year each city per month photos
    public String searchPhotoNumberByCitiesYear(
            @RequestParam(name = "year", defaultValue = "2016") String year,
            @RequestParam(name = "cities", defaultValue = "Barcelona") String citiesStr) {
    	String[] cities = citiesStr.split(",");
    	
    	 //ArrayList<String> CityPhotoPermonth = new ArrayList<String>(); 
         
         /*double[] cityRate = new double[200];
         String Res = "[";
         for (int i=0;i<cities.length;i++) {
        	 cityRate[i]=allServiceImpl.getPhotoPeryearRateByCname(year,cities[i]);
         	if(i!=cities.length-1)
         		Res =Res + "{\"name\":\"" + cities[i]+"\",\"y\":" +cityRate[i]+"},";
         	else
         		Res =Res + "{\"name\":\"" + cities[i]+"\",\"y\":" +cityRate[i]+"}]";
         }
          
         
         return Res;*/
         
         
         ArrayList<String> photoPermonth = new ArrayList<String>(); 
         
         
         for (int i=0;i<cities.length;i++) {
         	String result = "{\"name\":\"";
         	result = result + cities[i] + "\",\"data\":[";
         	int[] monthNum = allServiceImpl.getCityPhotoPerMonthByCityName(year,cities[i]);
         	for(int j=0;j<11;j++) {
         		result = result + monthNum[j]+",";
         	}
         	result = result + monthNum[11]+"]}";
         	photoPermonth.add(result);   	
         }
          
         String Res = "[";
         for(int i=0;i<photoPermonth.size();i++)
         {
         	if(i!=photoPermonth.size()-1)
         	    Res = Res + photoPermonth.get(i)+",";
         	else
         		Res = Res + photoPermonth.get(i)+"]";
         		
         }
         return Res;
    	
        // 统计在这一年中几种相机拍摄照片分别占比 -> pieChart
//        System.out.println(year);
//        String[] cities = citiesStr.split(",");
//        for (int i=0; i<cities.length; i++) {
//            System.out.println(cities[i]);
//        }
    	/*
        return "[{\"name\":\"Shanghai\",\"data\":[1.2,5.2,12.2,9.3,7.7,14.2,1.2,7.2,12.2,6.3,7.7,14.2]}," +
                "{\"name\":\"NewYork\",\"data\":[-1.2,5.2,12.2,6.3,9.7,18.2,1.2,3.2,12.2,6.3,4.7,12.2]}," +
                "{\"name\":\"London\",\"data\":[5.2,7.2,6.2,6.3,9.7,12.2,1.2,5.2,12.2,6.3,9.7,4.2]}]";
                */
         
    
    }

}
