package com.paint.paint_backend.Shapes;

public class IShape {
    double _x, _y, _rotate;
    String _stroke;
    double _strokeWidth;
    String _fill;
    String _id;

    String _type;
    boolean _draggable, _update, _deleteflag;
    IShape(double x, double y, String stroke, double strokeWidth, String fill, double rotate, boolean draggable, String id, boolean update, boolean deleteflag){
        this._x = x;
        this._y = y;
        this._stroke = stroke;
        this._strokeWidth = strokeWidth;
        this._fill = fill;
        this._rotate = rotate;
        this._draggable = draggable;
        this._id = id;
        this._update = update;
        this._deleteflag = deleteflag;
    }
    public double get_x() {
        return _x;
    }

    public void set_x(double _x) {
        this._x = _x;
    }

    public double get_y() {
        return _y;
    }

    public void set_y(double _y) {
        this._y = _y;
    }

    public double get_rotate() {
        return _rotate;
    }

    public void set_rotate(double _rotate) {
        this._rotate = _rotate;
    }

    public String get_stroke() {
        return _stroke;
    }

    public void set_stroke(String _stroke) {
        this._stroke = _stroke;
    }

    public String get_fill() {
        return _fill;
    }

    public void set_fill(String _fill) {
        this._fill = _fill;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public boolean is_draggable() {
        return _draggable;
    }

    public void set_draggable(boolean _draggable) {
        this._draggable = _draggable;
    }

    public boolean is_update() {
        return _update;
    }

    public void set_update(boolean _update) {
        this._update = _update;
    }

    public boolean is_deleteflag() {
        return _deleteflag;
    }

    public void set_deleteflag(boolean _deleteflag) {
        this._deleteflag = _deleteflag;
    }

    public double get_strokeWidth() {
        return _strokeWidth;
    }

    public void set_strokeWidth(double _strokeWidth) {
        this._strokeWidth = _strokeWidth;
    }

    public String get_type() {
        return _type;
    }

    public void set_type(String _type) {
        this._type = _type;
    }
}
