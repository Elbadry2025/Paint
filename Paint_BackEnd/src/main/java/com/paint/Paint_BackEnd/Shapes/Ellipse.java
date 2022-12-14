package com.paint.paint_backend.Shapes;

public class Ellipse extends IShape{
    private int _radiusX;
    private int _radiusY;
    Ellipse(int x, int y, String stroke, double strokeWidth, String fill, int rotate, boolean draggable, String id, boolean update, boolean deleteflag, int radiusX, int radiusY){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._radiusX = radiusX;
        this._radiusY = radiusY;
        super.set_type("ellipse");
    }


    public int get_radiusX() {
        return _radiusX;
    }

    public void set_radiusX(int _radiusX) {
        this._radiusX = _radiusX;
    }

    public int get_radiusY() {
        return _radiusY;
    }

    public void set_radiusY(int _radiusY) {
        this._radiusY = _radiusY;
    }
}
