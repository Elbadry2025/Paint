package com.paint.paint_backend.Shapes;

public class Rectangle extends IShape{
    private int _width;
    private int _height;

    Rectangle(int x, int y, String stroke, double strokeWidth, String fill, int rotate, boolean draggable, String id, boolean update, boolean deleteflag, int width, int height){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._width = width;
        this._height = height;
        super.set_type("rectangle");
    }

    public int get_width() {
        return _width;
    }

    public void set_width(int _width) {
        this._width = _width;
    }

    public int get_height() {
        return _height;
    }

    public void set_height(int _height) {
        this._height = _height;
    }

}
