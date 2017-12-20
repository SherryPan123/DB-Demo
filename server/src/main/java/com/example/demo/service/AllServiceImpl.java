package com.example.demo.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Photo;
import com.example.demo.PhotoDetail;
import com.example.demo.User;
import com.example.demo.UserDetail;


@Service
@Repository
@Transactional(propagation = Propagation.REQUIRED)
public class AllServiceImpl{
	@Autowired
	public JdbcTemplate jdbcTemplate;
	
	private static final String IMG_PATH_BASE = "http://10.222.119.205:8080/images";
	
	public List<Photo> findPhotosByterm(String term){

		String sql = "SELECT * FROM photo_tb where description like '%" + term + "%' limit 0, 30";
		
		System.out.println(sql);
		List<Photo> photos = new ArrayList<Photo>();

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		System.out.println(rows.size());
		for (Map row : rows) {
			String img_path = (String)row.get("image_path");
			System.out.println(img_path);
			img_path = img_path.replace("/home/dataology/flickr/flickr_data", IMG_PATH_BASE);
			//String content = "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(img_path));
			//System.out.println("content length: "+content.length());
			Photo photo = new Photo((int)(row.get("photo_id")), img_path);
			photos.add(photo);
		}

		return photos;
	}
	
	public List<User> getUserListByTerm(String term){
		String sql = "SELECT * FROM user_tb where user_name like '%" + term + "%' or real_name like '%" + term + "%' limit 0, 10";

		System.out.println(sql);
		List<User> users = new ArrayList<User>();

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		System.out.println(rows.size());
		for (Map row : rows) {
			Integer id = (int)row.get("user_id");
			String user_name = (String)row.get("user_name");
			//Integer num_of_photos = (int)row.get("number_of_photos");
			int num_of_photos = 1;
			User user = new User(id, user_name, num_of_photos);
			users.add(user);
		}

		return users;
	}
	
	public UserDetail getUserDetailByUserId(String userId) {
		String sql = "SELECT * FROM user_tb where user_id = " + userId ;
		System.out.println(sql);
		List<UserDetail> userDetails = new ArrayList<UserDetail>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		System.out.println(rows.size());		
		for (Map row : rows) {
			Integer user_id = (int)row.get("user_id");
			String user_name = (String)row.get("user_name");
			String real_name = (String)row.get("real_name");
			String address = (String)row.get("address");
			String image_path = "/home/dataology/flickr/flickr_data/Paris/19176752995.jpg";// TODO
			//img_path = img_path.replace("/home/dataology/flickr/flickr_data", IMG_PATH_BASE);
			String content = "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(image_path));
			UserDetail userDetail = new UserDetail(user_id, user_name, real_name, address, content);
			userDetails.add(userDetail);
		}

		return userDetails.get(0);
	}
	
	public List<PhotoDetail> getPhotoDetailsByUserId(String userId){
		String sql = "SELECT * FROM photo_tb where user_id = " + userId + " limit 0, 20";
		System.out.println(sql);
		List<PhotoDetail> photoDetails = new ArrayList<PhotoDetail>();

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		System.out.println(rows.size());
		for (Map row : rows) {
			Integer photo_id = (int)row.get("photo_id");
			String image_path = (String)row.get("image_path");
			image_path = image_path.replace("/home/dataology/flickr/flickr_data", IMG_PATH_BASE);
			//String content = "data:image/jpeg;base64," + encodeFileToBase64Binary(new File(image_path));
			String description = (String)row.get("description");

		    Random random = new Random();  

			int votes = random.nextInt(50);
			int views = random.nextInt(50) + votes; 
			
			PhotoDetail photoDetail = new PhotoDetail(photo_id, image_path);
			
			photoDetail.setViews(views);
			photoDetail.setVotes(votes);
			photoDetails.add(photoDetail);
		}

		return photoDetails;
	}
	
	//add new function1
	public int[] getPhotoPermonthByCname(String year,String cameraName){
		System.out.println(cameraName);
		//??? camera name????
		String sql = "SELECT * FROM photo_tb where camera_type like '%" +  cameraName + "%'";
		System.out.println(sql);

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		System.out.println(rows.size());
		int[] monthNum = new int[12];
		
		for(int i=0;i<12;i++)
			monthNum[i] = 0;
		
		for (Map row : rows) {
			//Integer photo_id = (int)row.get("photo_id");
			//??? the dates'format???
			Timestamp ts = (Timestamp)row.get("taken_time");
			
	        String date = "";   
	        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");   
	        try {   
	            //method1  
	            //tsStr = sdf.format(ts);   
	           // System.out.println(tsStr);   
	            //method2 
	            date = ts.toString();   
	           // System.out.println(date);   
	        } catch (Exception e) {   
	            e.printStackTrace();   
	        }  

					
			//System.out.println(date);
			String[] times = date.split("-");
			if(times[0].equals(year)) {
				for(int i=0;i<12;i++) {
					if(i+1==Integer.parseInt(times[1])) {
						monthNum[i]++;
						break;
					}
				}
			
			}//if

		}
		
		for(int i=0;i<12;i++) {
			System.out.println(monthNum[i]);
		}

		return monthNum;			
	}
	
	//add new function2
	public double getPhotoPeryearRateByCname(String year,String cameraName){
		
		
		//??? camera name????
		String sql1 = "SELECT COUNT(*) FROM photo_tb where DATE_FORMAT(taken_time,'%Y') = " + year;
		String sql2 = "SELECT COUNT(*) FROM photo_tb where camera_type like '%" +  cameraName + "%' AND DATE_FORMAT(taken_time,'%Y') = "+year;
		System.out.println(sql1);
		System.out.println(sql2);
		
		//String sql3 = "SELECT * FROM photo_tb where camera_type = " +  cameraName;
		

		//ArrayList<String> photoListByCamera = new ArrayList<String>();

		//List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql1);
		List<Map<String, Object>> yearPNum = jdbcTemplate.queryForList(sql1);
		List<Map<String, Object>> cameraPNum = jdbcTemplate.queryForList(sql2);
		//System.out.println(yearPNum.size());
		//System.out.println(cameraPNum.size());
		long ypnum=0;
		long cpnum=0;
		
		for (Map row : yearPNum) {
		
			 ypnum = (long)row.get("COUNT(*)");
			 System.out.println(ypnum);

		}
		
		for (Map row : cameraPNum) {
			
			cpnum = (long)row.get("COUNT(*)");
			System.out.println(cpnum);

		}
		
		System.out.println(ypnum);
		System.out.println(cpnum);
		
		System.out.println(cpnum*1.0/ypnum);

		return cpnum*1.0/ypnum;	
	}
	
	//add new function3
		public int[] getCityPhotoPerMonthByCityName(String year,String city){
			//??? camera name????
			String sql = "SELECT * FROM photo_tb where city like '%" +  city + "%'";
			System.out.println(sql);
			//ArrayList<String> photoListByCamera = new ArrayList<String>();

			List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
			System.out.println(rows.size());
			int[] monthNum = new int[12];
			
			for(int i=0;i<12;i++)
				monthNum[i] = 0;
			
			for (Map row : rows) {
				//Integer photo_id = (int)row.get("photo_id");
				
				Timestamp ts = (Timestamp)row.get("taken_time");
				
				String date = "";
				
				DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");   
		        try {   
	
		            date = ts.toString();   
		           // System.out.println(date);   
		        } catch (Exception e) {   
		            e.printStackTrace();   
		        }  
				
				String[] times = date.split("-");
				if(times[0].equals(year)) {
					for(int i=0;i<12;i++) {
						if(i+1==Integer.parseInt(times[1])) {
							monthNum[i]++;
							break;
						}
					}
				
				}//if

			}

			return monthNum;	
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
}
