package com.paint.paint_backend.Shapes;

public class Circle extends IShape{
    private double _radius;
    Circle(int x, int y, String stroke, double strokeWidth, String fill, int rotate, boolean draggable, String id, boolean update, boolean deleteflag, double radius){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._radius = radius;
        super.set_type("circle");
    }

    public double get_radius() {
        return _radius;
    }

    public void set_radius(double _radius) {
        this._radius = _radius;
    }
}
