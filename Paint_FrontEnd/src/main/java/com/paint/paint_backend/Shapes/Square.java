package com.paint.paint_backend.Shapes;

public class Square extends IShape{
    private int _sideLength;

    Square(int x, int y, String stroke, double strokeWidth, String fill, int rotate, boolean draggable, String id, boolean update, boolean deleteflag, int sideLength){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._sideLength = sideLength;
        super.set_type("square");
    }


    public int get_sideLength() {
        return _sideLength;
    }

    public void set_sideLength(int _sideLength) {
        this._sideLength = _sideLength;
    }
}
