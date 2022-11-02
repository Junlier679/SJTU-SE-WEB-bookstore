package com.example.bookstore1.controllers;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.example.bookstore1.service.OrderItemsService;
import com.example.bookstore1.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.bookstore1.service.BookService;
import org.springframework.web.bind.annotation.RestController;
import com.example.bookstore1.entity.Book;
import com.example.bookstore1.service.UserService;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import com.example.bookstore1.entity.Order;
import com.example.bookstore1.entity.OrderItems;
import org.springframework.kafka.core.KafkaTemplate;
@CrossOrigin
@RestController
public class OrderController {

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemsService orderItemsService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @GetMapping(value="/createorder/{username}/{priceAll}/{trolley}")
    @ResponseBody
    public void createOrder(@PathVariable String username,@PathVariable Double priceAll,@PathVariable JSONArray trolley){
//        User user=userService.findUserbyName(username);
//        int user_id=user.getId();
//        Order order= orderService.save(user_id,priceAll);
//        Integer len=trolley.size();
//        for(Integer i=0;i<len;i+=4){
//            List<Book> books=bookService.findBookByName(trolley.getString(i));
//            Iterator<Book> it = books.iterator();
//            Book book = (Book) it.next();
//            OrderItems orderItem = new OrderItems();
//            orderItem.setOrderID(order.getOrder_id());
//            orderItem.setItemsID(book.getId());
//            orderItem.setNumber(trolley.getInteger(i+2));
//            orderItemsService.edit(orderItem);
//        }
//        System.out.println(order.getOrder_id());
//        orderService.createOrder(username,priceAll,trolley);
        String data="";
        data += username+",";
        int size = trolley.size();
        for(int i=0;i<size;++i)data += trolley.getString(i)+",";
        data += priceAll;
        this.kafkaTemplate.send("orderTopic","key",data);
    }

    @GetMapping(value="/getOrders")
    @ResponseBody
    public String findAll() {
        List<Order> orders = orderService.findAll();
        Iterator<Order> it = orders.iterator();
        ArrayList<com.alibaba.fastjson.JSONArray> ordersJson = new ArrayList<com.alibaba.fastjson.JSONArray>();
        while (it.hasNext()) {
            Order order = (Order) it.next();
            ArrayList<Integer> arrayList = new ArrayList<Integer>();
            arrayList.add(order.getOrder_id());
            arrayList.add(order.getUser_id());
            ordersJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList));
        }
        String  ordersString = JSON.toJSONString(ordersJson, SerializerFeature.BrowserCompatible);
        return ordersString;
    }

    @GetMapping(value="/getOrderDetails/{orderID}")
    @ResponseBody
    public String getOrders(@PathVariable Integer orderID) {
//        List<Order> orders = orderService.findOrderByOrderID(orderID);
        List<Order> orders = orderService.findAll();
        Iterator<Order> it = orders.iterator();
        ArrayList<com.alibaba.fastjson.JSONArray> ordersJson = new ArrayList<com.alibaba.fastjson.JSONArray>();
        while (it.hasNext()) {
            Order order = (Order) it.next();
            if(order.getOrder_id() == orderID) {
                ArrayList<Integer> arrayList = new ArrayList<Integer>();
                arrayList.add(order.getOrder_id());
                arrayList.add(order.getUser_id());
                ArrayList<Double> arrayList1 = new ArrayList<Double>();
                arrayList1.add(order.getPrice());
                ArrayList<String> arrayList2 = new ArrayList<String>();
                arrayList2.add(order.getTime());
                ordersJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList));
                ordersJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList1));
                ordersJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList2));
            }
        }
        String  ordersString = JSON.toJSONString(ordersJson, SerializerFeature.BrowserCompatible);
        return ordersString;
    }

    @GetMapping(value="/getOrderItems/{orderID}")
    @ResponseBody
    public String getOrderItems(@PathVariable Integer orderID) {
        List<OrderItems> orderItems = orderItemsService.findAll();
        Iterator<OrderItems> it = orderItems.iterator();
        ArrayList<com.alibaba.fastjson.JSONArray> orderItemsJson = new ArrayList<com.alibaba.fastjson.JSONArray>();
        while (it.hasNext()) {
            OrderItems orderItem = (OrderItems) it.next();
            if(orderItem.getOrderID() == orderID) {
                ArrayList<Integer> arrayList = new ArrayList<Integer>();
                arrayList.add(orderItem.getId());
                orderItemsJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList));
            }
        }
        String  ordersString = JSON.toJSONString(orderItemsJson, SerializerFeature.BrowserCompatible);
        return ordersString;
    }

    @GetMapping(value="/getItemDetails/{itemID}")
    @ResponseBody
    public String getItemDetails(@PathVariable Integer itemID) {
        OrderItems orderItem = orderItemsService.findOrderItemsByID(itemID);
        ArrayList<com.alibaba.fastjson.JSONArray> orderItemsJson = new ArrayList<com.alibaba.fastjson.JSONArray>();

        ArrayList<Integer> arrayList = new ArrayList<Integer>();
        arrayList.add(orderItem.getNumber());
        Book book = bookService.findBookById(orderItem.getItemsID());
        ArrayList<Double> arrayList1 = new ArrayList<Double>();
        arrayList1.add(book.getPrice());
        arrayList1.add(book.getPrice()*orderItem.getNumber());
        ArrayList<String> arrayList2 = new ArrayList<String>();
        arrayList2.add(book.getName());

        orderItemsJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList));
        orderItemsJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList1));
        orderItemsJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList2));
        String  ordersString = JSON.toJSONString(orderItemsJson, SerializerFeature.BrowserCompatible);
        return ordersString;
    }
}
