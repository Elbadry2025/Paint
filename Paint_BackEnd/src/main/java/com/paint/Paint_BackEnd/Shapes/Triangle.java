package com.paint.paint_backend.Shapes;

public class Triangle extends IShape{
    private double[] _points;
    Triangle(int x, int y, String stroke, double strokeWidth, String fill, int rotate, boolean draggable, String id, boolean update, boolean deleteflag, double[] points){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._points = points;
        super.set_type("triangle");
    }

    public double[] get_points() {
        return _points;
    }

    public void set_points(double[] _points) {
        this._points = _points;
    }
}
