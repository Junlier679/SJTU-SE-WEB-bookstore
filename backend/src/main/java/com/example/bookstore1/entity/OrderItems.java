package com.example.bookstore1.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
@Entity
@Table(name = "orderitems")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class OrderItems {
    private int id;
    private int orderID;
    private int itemsID;
    private int number;
    public OrderItems(){}
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId(){return  id;}
    public void setId(int id){this.id=id;}

    @Basic
    @Column(name = "orderID")
    public int getOrderID(){return orderID;}
    public void setOrderID(int orderID){this.orderID=orderID;}

    @Basic
    @Column(name = "itemsID")
    public int getItemsID(){return itemsID;}
    public void setItemsID(int itemsID) {
        this.itemsID = itemsID;
    }

    @Basic
    @Column(name = "number")
    public int getNumber(){return number;}
    public void setNumber(int number) {
        this.number = number;
    }
}
