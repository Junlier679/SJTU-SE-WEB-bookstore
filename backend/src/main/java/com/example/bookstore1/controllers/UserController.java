package com.example.bookstore1.controllers;
import com.example.bookstore1.service.TimerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import com.example.bookstore1.entity.User;
import com.example.bookstore1.service.UserService;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;
//import net.sf.json.JSONArray;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.springframework.web.context.WebApplicationContext;

@CrossOrigin
@RestController
@Scope("session")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    WebApplicationContext applicationContext;

    @RequestMapping(value = "/login/{username}/{password}")
    @ResponseBody
    public String findAll(@PathVariable String username, @PathVariable String password) {

        TimerService timerService=applicationContext.getBean(TimerService.class);
        System.out.println(this);
        timerService.Start();

        List<User> users = userService.findAll();
        Iterator<User> it = users.iterator();
        var flag = 0;
        // ArrayList<JSONArray> userJson = new ArrayList<JSONArray>();
        while (it.hasNext()) {
            User user = (User) it.next();
          /*  ArrayList<String> arrayList = new ArrayList<String>();
            arrayList.add(user.getId());
            arrayList.add(user.getUsername());
            arrayList.add(user.getPassword());
            userJson.add((JSONArray) JSONArray.toJSON(arrayList));*/

            if (username.equals(user.getUsername()) && password.equals(user.getPassword()) && user.getValid().equals("valid")) {
                return JSON.toJSONString("success");
            }
            if (username.equals(user.getUsername()) && password.equals(user.getPassword()) && user.getValid().equals("Notvalid")) {
                return JSON.toJSONString("notValid");
            }

        }

        // String userString = JSON.toJSONString(userJson, SerializerFeature.BrowserCompatible);
        return JSON.toJSONString("failure");

        // return userString;

    }

    @RequestMapping(value = "/Logout")
    @ResponseBody
    public String handleLogout(){
        TimerService timerService=applicationContext.getBean(TimerService.class);
        System.out.println(timerService.End());
        //System.out.println("此次登录时间为"+timerService.End()+"毫秒");
        return JSON.toJSONString("logout success");
    }

    @RequestMapping(value = "/signup/{username}/{password}/{emailaddress}")
    @ResponseBody
    public String handleRegister(@PathVariable String username, @PathVariable String password, @PathVariable String emailaddress) {
        String message = userService.save(username, password, emailaddress);
        return JSON.toJSONString(message);
    }

    @RequestMapping(value = "/getUserinfo")
    @ResponseBody
    public String getUserinfo() {
        List<User> users = userService.findAll();
        Iterator<User> it = users.iterator();
        ArrayList<JSONArray> userJson = new ArrayList<JSONArray>();
        while (it.hasNext()) {
            User user = (User) it.next();
            ArrayList<String> arrayList = new ArrayList<String>();
            arrayList.add(user.getUsername());
            arrayList.add(user.getPassword());
            arrayList.add(user.getEmailaddress());
            arrayList.add(user.getValid());
            userJson.add((JSONArray) JSONArray.toJSON(arrayList));
        }
        String userString = JSON.toJSONString(userJson, SerializerFeature.BrowserCompatible);
        return userString;
    }

    @RequestMapping(value = "/getUsername/{userID}")
    @ResponseBody
    public String getUsername(@PathVariable int userID) {
        List<User> users = userService.findAll();
        Iterator<User> it = users.iterator();
        ArrayList<JSONArray> userJson = new ArrayList<JSONArray>();
        while (it.hasNext()) {
            User user = (User) it.next();
            if(user.getId() == userID) {
                return JSON.toJSONString(user.getUsername());
            }
        }
        return JSON.toJSONString("notFound");
    }

    @RequestMapping(value = "/valid/{username}")
    @ResponseBody
    public String Valid(@PathVariable String username) {
        User user=userService.findUserbyName(username);
        String isValid=user.getValid();
        String message="";
        if(isValid.equals("valid")){
            user.setValid("Notvalid");
            message="Notvalid";
        }
        else if(isValid.equals("Notvalid")){
            user.setValid("valid");
            message="valid";
        }
        userService.validsave(user);
        return JSON.toJSONString(message);
    }
}
