package com.paint.paint_backend;

import com.google.gson.Gson;
import com.paint.paint_backend.Shapes.*;
import org.json.JSONException;
import org.json.JSONObject;

public class factory implements Ifactory{

    public IShape constructShape(String type, String receivedJSON) throws JSONException {
        IShape shape;
        JSONObject JO = new JSONObject(receivedJSON);
        Gson G = new Gson();
        System.out.println(JO);
        if(type.toLowerCase().equals("square")){
            shape = G.fromJson(receivedJSON, Square.class);
        }else if(type.toLowerCase().equals("rectangle")){
            shape = G.fromJson(receivedJSON, Rectangle.class);
        }else if(type.toLowerCase().equals("circle")){
            shape = G.fromJson(receivedJSON, Circle.class);
        }else if(type.toLowerCase().equals("ellipse")){
            shape = G.fromJson(receivedJSON, Ellipse.class);
        }else if(type.toLowerCase().equals("triangle")){
            shape = G.fromJson(receivedJSON, Triangle.class);
        }else{
            shape = G.fromJson(receivedJSON, Line.class);
        }
        return shape;
    }
}
