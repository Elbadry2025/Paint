package com.paint.paint_backend.Shapes;

public class Square extends IShape{
    private int _sideLength;

    Square(int x, int y, String stroke, String fill, int rotate, boolean draggable, String id, int sideLength){
        super(x, y, stroke, fill, rotate, draggable, id);
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
