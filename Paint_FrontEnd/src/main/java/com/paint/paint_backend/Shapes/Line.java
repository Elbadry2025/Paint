package com.paint.paint_backend.Shapes;

public class Line extends IShape{
    private int[] _points;
    Line(int x, int y, String stroke, double strokeWidth, String fill, int rotate, boolean draggable, String id, boolean update, boolean deleteflag, int[] points){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._points = points;
        super.set_type("line");
    }

    public int[] get_points() {
        return _points;
    }

    public void set_points(int[] _points) {
        this._points = _points;
    }
}
