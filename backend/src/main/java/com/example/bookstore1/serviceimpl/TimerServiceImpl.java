package com.example.bookstore1.serviceimpl;
import org.springframework.context.annotation.Scope;
import com.example.bookstore1.service.TimerService;
import org.springframework.stereotype.Service;

@Service
@Scope("session")
public class TimerServiceImpl implements TimerService{
    private long startTime = 0;
    private long endTime = 0;

    @Override
    public void Start(){
        startTime = 0;
        endTime = 0;
        startTime = System.currentTimeMillis();
        System.out.println(this + "start");
    }

    @Override
    public long End(){
        endTime = System.currentTimeMillis();
        long time = endTime-startTime;

        System.out.println(this + "end");
        return time;
    }
}
