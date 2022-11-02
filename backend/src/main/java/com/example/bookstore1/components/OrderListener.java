package com.example.bookstore1.components;
import com.alibaba.fastjson.JSONArray;
import org.springframework.stereotype.Component;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import com.example.bookstore1.service.*;

@Component
public class OrderListener {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    @Autowired
    private OrderService orderService;
    @Autowired
    private WebSocketServer ws;

    @KafkaListener (topics = {"orderTopic"},groupId = "test-consumer-group")
    public void orderTopicListener(ConsumerRecord<String, String> record) {
        String[] value = ((String)record.value()).split(",");
        JSONArray trolley = new JSONArray();
        int size =value.length;
        String data = "";
        for(int i=1;i<size-1;++i) {
            trolley.add(value[i]);
            data += value[i];
            if(i != size-2)data+=",";
        }
        orderService.createOrder(value[0],Double.parseDouble(value[size-1]),trolley);
        data += ","+value[size-1];//priceAll
        data += ","+value[0];//username
        this.kafkaTemplate.send("responseTopic","key",data);
    }

    @KafkaListener (topics = {"responseTopic"},groupId = "test-consumer-group")
    public void responseTopicListener(ConsumerRecord<String, String> record) {
        String[] value =((String)record.value()).split(",");
        int size = value.length;
        String data = "";
        for(int i=0;i<size-1;++i) {
            data +=value[i];
            if(i != size-2)data+=",";
        }
        //data = trolley+priceAll
        this.ws.sendMessageToUser(value[size-1],data);
    }
}
