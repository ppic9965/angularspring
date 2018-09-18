package com.fifDe.myangular.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Service;
import com.fifDe.myangular.model.User;

@Service("userService")
public class UserServiceImpl implements UserService{
private static final AtomicLong counter = new AtomicLong(); //AtomicLong 멀티쓰레드(분산처리)를 위하여 쓰는 명령어
private static List<User> users;
static{
	users= populateDummyUsers();
}
public List<User> findAllUsers(){
	return users;
}
public User findById(long id){
	for(User user: users){
		if(user.getId() == id){
			return user;
		}
	}
	return null;
}
public User findByName(String name) {
	 for(User user : users){
		 if(user.getUsername().equalsIgnoreCase(name)){
			 return user;
		 }
	 }
	 return null;
}
public void saveUser(User user){
	user.setId(counter.incrementAndGet());
	users.add(user);
}
public void updateUser(User user){
	int index = users.indexOf(user);
	users.set(index, user);
}

public void deleteUserById(long id){
	for(Iterator<User> iterator = users.iterator(); iterator.hasNext();){
		User user = iterator.next();
		if(user.getId() == id){
			iterator.remove();
		}
	}
}
public boolean isUserExist(User user){
	return findByName(user.getUsername())!=null;
}
public void deleteAllUsers(){
	users.clear();
}
private static List<User> populateDummyUsers(){
	List<User> users = new ArrayList<User>();
	users.add(new User(counter.incrementAndGet(),"잘하자", "충주시 안림동","goodman@naver.com"));
	users.add(new User(counter.incrementAndGet(),"성공", "서울시 종로구","success@korea.com"));
	users.add(new User(counter.incrementAndGet(),"빅사랑", "부산시 앞바다","love@seoul.com"));
	return users;
}
}
