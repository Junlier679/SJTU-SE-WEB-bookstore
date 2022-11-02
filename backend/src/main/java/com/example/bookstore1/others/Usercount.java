package com.example.bookstore1.others;

public class Usercount {
    private int id;
    private int number;
    public Usercount(int id,int number){
        this.id=id;
        this.number=number;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
