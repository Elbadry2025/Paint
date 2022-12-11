package com.paint.paint_backend;

import com.paint.paint_backend.Shapes.IShape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShapeService {
    private static IShape[] shapeList = new IShape[100];
    private static int availableID = 0;
    public static String addShape(IShape shape){
        shape.set_id(availableID);
        shapeList[shape.get_id()] = shape;
        availableID++;
        return "Shape with id: " + Integer.toString(shape.get_id()) + " saved successfully";
    }
}
