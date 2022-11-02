package com.example.bookstore1.components;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

@ServerEndpoint("/websocket/getorderInfo/{username}")
@Component
public class WebSocketServer {
    private static final AtomicInteger COUNT = new AtomicInteger();
    private static final ConcurrentHashMap<String, Session> SESSIONS = new ConcurrentHashMap();

    public WebSocketServer() {
        System.out.println("connect!");
    }

    public void sendMessage(Session toSession, String message) {
        if (toSession != null) {
            try {
                toSession.getBasicRemote().sendText(message);
            } catch (IOException var4) {
                var4.printStackTrace();
            }
        } else {
            System.out.println("not online");
        }

    }

    public void sendMessageToUser(String user, String message) {
        System.out.println(user);
        Session toSession = (Session)SESSIONS.get(user);
        this.sendMessage(toSession, message);
        System.out.println(message);
    }

    @OnMessage
    public void onMessage(String message) {
        System.out.println("received: " + message);
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) {
        if (SESSIONS.get(username) == null) {
            SESSIONS.put(username, session);
            COUNT.incrementAndGet();
            System.out.println(username + "is online,there are " + COUNT);
        }
    }

    @OnClose
    public void onClose(@PathParam("username") String userId) {
        SESSIONS.remove(userId);
        COUNT.decrementAndGet();
        System.out.println(userId + "is offline,there are：" + COUNT);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("wrong!");
        throwable.printStackTrace();
    }
}

