package com.paint.paint_backend;

import com.paint.paint_backend.Shapes.IShape;
import com.paint.paint_backend.Shapes.Square;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;
import org.json.*;
import com.google.gson.*;

@Service
public class ShapeService {
    private static Stack<IShape> undo_stack = new Stack<>();
    private static Stack<IShape> redo_stack = new Stack<>();
    private static HashMap<String, IShape> currentShapes = new HashMap<>();
    public static String addShape(String receivedJSON) throws JSONException {

        JSONObject JO = new JSONObject(receivedJSON);
        Gson G = new Gson();
        IShape shape = G.fromJson(receivedJSON, Square.class);
        undo_stack.push(shape);
        System.out.println("Undo Stack: " + undo_stack);
        System.out.println("Redo Stack: " + redo_stack);
        redo_stack.clear();
        currentShapes.put(shape.get_id(), shape);
        return "Shape with id: " + shape.get_id() + " saved successfully";
    }
    public static String undo(){
        if(undo_stack.isEmpty()){
            return "Error";
        }
        IShape popped = undo_stack.pop();
        System.out.println("Undo Stack: " + undo_stack);
        redo_stack.push(popped);
        System.out.println("Redo Stack: " + redo_stack);
        currentShapes.remove(popped.get_id());
        return new Gson().toJson(popped);
    }
    public static String redo(){
        if(redo_stack.isEmpty()){
            return "Error";
        }
        IShape popped = redo_stack.pop();
        undo_stack.push(popped);
        System.out.println("Undo Stack: " + undo_stack);
        System.out.println("Redo Stack: " + redo_stack);
        currentShapes.put(popped.get_id(), popped);
        return new Gson().toJson(popped);
    }
    public static void restart(){
        undo_stack.clear();
        redo_stack.clear();
        currentShapes.clear();
    }
}
