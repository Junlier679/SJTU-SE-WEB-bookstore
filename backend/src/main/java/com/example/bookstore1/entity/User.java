package com.example.bookstore1.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import javax.persistence.*;

@Entity
@Table(name = "users")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class User {
    private int userid;
    private String username;
    private String password;
    private String emailaddress;
    private String valid;
    public User(){}
    public User(String username,String password,String emailaddress,String valid){
        this.username=username;
        this.password=password;
        this.emailaddress=emailaddress;
        this.valid=valid;
    }
    @Id
    @Column(name="userid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() { return userid; }
    public void setId(int userid) { this.userid = userid; }

    @Basic
    @Column(name="username")
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    @Basic
    @Column(name="password")
    public String getPassword(){return password;}
    public void setPassword(String password){this.password=password;}

    @Basic
    @Column(name="emailaddress")
    public String getEmailaddress(){return emailaddress;}
    public void setEmailaddress(String emailaddress){this.emailaddress=emailaddress;}

    @Basic
    @Column(name="valid")
    public String getValid(){return valid;}
    public void setValid(String valid){this.valid=valid;}



}
