package com.paint.paint_backend;

import ch.qos.logback.core.joran.sanity.Pair;
import com.paint.paint_backend.Shapes.*;
import com.paint.paint_backend.Shapes.Rectangle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.*;
import java.util.*;

import org.json.*;
import com.google.gson.*;

import javax.swing.*;
import javax.swing.filechooser.FileNameExtensionFilter;

@Service
public class ShapeService {
    static GraphicsConfiguration gc;
    private static Stack<IShape> undo_stack = new Stack<>();
    private static Stack<IShape> redo_stack = new Stack<>();
    private static Stack<IShape> replace_stack_undo = new Stack<>();
    private static Stack<IShape> replace_stack_redo = new Stack<>();
    private static Stack<IShape> delete_stack = new Stack<>();
    private static HashMap<String, IShape> currentShapes = new HashMap<>();
    public static String addShape(String receivedJSON, String type) throws JSONException {

        JSONObject JO = new JSONObject(receivedJSON);
        Gson G = new Gson();
        System.out.println(JO);
        IShape shape;
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
        }else if(type.toLowerCase().equals("line")){
            shape = G.fromJson(receivedJSON, Line.class);
        }else{
            return "Something bad happened";
        }
        undo_stack.push(shape);
        redo_stack.clear();
        currentShapes.put(shape.get_id(), shape);
        System.out.println("Undo Stack: " + undo_stack);
        System.out.println("Redo Stack: " + redo_stack);
        System.out.println("Replace Stack: " + replace_stack_undo);
        System.out.println("Replace Stack: " + replace_stack_redo);
        System.out.println();
        return "Shape with id: " + shape.get_id() + " saved successfully";
    }
    public static String undo(){
        if(undo_stack.isEmpty()){
            return "Error";
        }
        IShape popped = undo_stack.pop();
        if(!popped.is_update()){
            redo_stack.push(popped);
            currentShapes.remove(popped.get_id());
        }else{
            redo_stack.push(popped);
            currentShapes.remove(popped.get_id());
            popped = replace_stack_undo.pop();
        }
        System.out.println("Undo Stack: " + undo_stack);
        System.out.println("Redo Stack: " + redo_stack);
        System.out.println("Replace Stack: " + replace_stack_undo);
        System.out.println("Replace Stack: " + replace_stack_redo);
        System.out.println();
        return new Gson().toJson(popped);
    }
    public static String redo(){
        if(redo_stack.isEmpty()){
            return "Error";
        }
        IShape popped = redo_stack.pop();
        undo_stack.push(popped);
        currentShapes.put(popped.get_id(), popped);
        System.out.println("Undo Stack: " + undo_stack);
        System.out.println("Redo Stack: " + redo_stack);
        System.out.println("Replace Stack: " + replace_stack_undo);
        System.out.println("Replace Stack: " + replace_stack_redo);
        System.out.println();
        return new Gson().toJson(popped);
    }
    public static String deleteShape(String receivedJSON, boolean UR, String type) throws JSONException {
        JSONObject JO = new JSONObject(receivedJSON);
        Gson G = new Gson();
        IShape shape;
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
        }else if(type.toLowerCase().equals("line")){
            shape = G.fromJson(receivedJSON, Line.class);
        }else{
            return "Something bad happened";
        }
        String message;
        if(shape.is_update()){
            if(UR){
                replace_stack_undo.push(shape);
            }else{
                replace_stack_redo.push(shape);
            }
            currentShapes.remove(shape.get_id(), shape);
            message = "Shape with id: " + shape.get_id() + " updated successfully";
        }else{
            delete_stack.push(shape);
            currentShapes.remove(shape.get_id(), shape);
            message = "Shape with id: " + shape.get_id() + " deleted successfully";
        }
        System.out.println("Undo Stack: " + undo_stack);
        System.out.println("Redo Stack: " + redo_stack);
        System.out.println("Replace Stack: " + replace_stack_undo);
        System.out.println("Replace Stack: " + replace_stack_redo);
        System.out.println();
        return message;
    }
    public static void save() throws IOException {
        String extension = "", canonPath = "";
        // parent component of the dialog
        System.setProperty("java.awt.headless", "false");
        JFrame fe = new JFrame(gc);
        // set the size of the frame
        fe.setSize(800, 600);
        // set the frame's visibility
        fe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setPreferredSize(new Dimension(800, 600));
        fileChooser.setVisible(true);
        fe.setAlwaysOnTop(true);
        fileChooser.setDialogTitle("Specify a file to save");
        fileChooser.addChoosableFileFilter(new FileNameExtensionFilter(".json", "json"));
        fileChooser.addChoosableFileFilter(new FileNameExtensionFilter(".xml", "xml"));
        fileChooser.removeChoosableFileFilter(fileChooser.getAcceptAllFileFilter());
        int userSelection = fileChooser.showSaveDialog(fe);
        if (userSelection == JFileChooser.APPROVE_OPTION) {
            File fileToSave = fileChooser.getSelectedFile();
            extension = fileChooser.getFileFilter().getDescription();
            canonPath = fileToSave.getCanonicalPath();
            fe.remove(fileChooser);
        } else if (userSelection == JFileChooser.CANCEL_OPTION) {
            fileChooser.setVisible(false);
            fe.remove(fileChooser);
            return;
        }
        if (extension.equals(".json")) {
            try {
                Gson gson = new GsonBuilder()
                        .setPrettyPrinting()
                        .create();
                FileWriter f = new FileWriter(canonPath + extension);
                ArrayList<IShape> x = new ArrayList<>();
                Set<String> keySet = currentShapes.keySet();
                for (String key : keySet) {
                    x.add(currentShapes.get(key));
                }
                gson.toJson(x, f);
                f.flush();
                f.close();

            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            try {
                FileOutputStream fos = new FileOutputStream(canonPath + extension);
                XMLEncoder encoder = new XMLEncoder(fos);
                ArrayList<IShape> x = new ArrayList<>();
                Set<String> keySet = currentShapes.keySet();
                for (String key : keySet) {
                    x.add(currentShapes.get(key));
                }
                encoder.writeObject(x);
                encoder.close();
                fos.flush();
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
    public static String load() throws IOException {
        String message;
        String canonPath = "", extension = "";
        // parent component of the dialog
        System.setProperty("java.awt.headless", "false");
        JFrame fe = new JFrame(gc);
        // set the size of the frame
        fe.setSize(800, 600);
        // set the frame's visibility
        fe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setPreferredSize(new Dimension(800, 600));
        fileChooser.setVisible(true);
        fe.setAlwaysOnTop(true);
        fileChooser.setDialogTitle("Specify a file to load");
        fileChooser.addChoosableFileFilter(new FileNameExtensionFilter(".json", "json"));
        fileChooser.addChoosableFileFilter(new FileNameExtensionFilter(".xml", "xml"));
        fileChooser.removeChoosableFileFilter(fileChooser.getAcceptAllFileFilter());
        int userSelection = fileChooser.showOpenDialog(fe);
        if (userSelection == JFileChooser.APPROVE_OPTION) {
            File fileToLoad = fileChooser.getSelectedFile();
            canonPath = fileToLoad.getCanonicalPath();
            extension = fileChooser.getFileFilter().getDescription();
            fe.remove(fileChooser);
            fileChooser.setVisible(false);
        } else if (userSelection == JFileChooser.CANCEL_OPTION) {
            fileChooser.setVisible(false);
            fe.remove(fileChooser);
            message = "canceled";
            return "Error";
        }

        if (extension.equals(".json")) {
            try {
                Gson json = new Gson();
                FileReader f = new FileReader(canonPath);
                ArrayList<IShape> x = json.fromJson(f, ArrayList.class);
                f.close();
                String y = new Gson().toJson(x);
                message = y;
                return y;
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            try {
                FileInputStream f2 = new FileInputStream(canonPath);
                XMLDecoder mydecoder = new XMLDecoder(f2);
                ArrayList<IShape> result = (ArrayList<IShape>) mydecoder.readObject();
                mydecoder.close();
                f2.close();
                Gson gson = new GsonBuilder()
                        .setPrettyPrinting()
                        .create();
                return gson.toJson(result);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return null;
    }
    public static void restart(){
        undo_stack.clear();
        redo_stack.clear();
        currentShapes.clear();
        replace_stack_undo.clear();
        replace_stack_redo.clear();
        delete_stack.clear();
        System.out.println("\n\n\n\n\n\n\n");
    }
}
