package com.example.bookstore1.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


@Entity
@Table(name = "orders")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class Order {
    private int orderID;
    private int userid;
    private double price;
    private String time;
    public Order(){}
    @Id
    @Column(name = "orderID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getOrder_id(){return orderID;}
    public void setOrder_id(int orderID){this.orderID=orderID;}

    @Basic
    @Column(name = "userid")
    public int getUser_id(){return userid;}
    public void setUser_id(int userid){this.userid=userid;}

    @Basic
    @Column(name = "price")
    public double getPrice(){return price;}
    public void setPrice(double price){this.price=price;}

    @Basic
    @Column(name = "time")
    public String getTime(){return time;}
    public void setTime(String time){this.time=time;}
}
