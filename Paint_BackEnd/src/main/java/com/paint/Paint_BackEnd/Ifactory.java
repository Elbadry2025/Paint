package com.paint.paint_backend;

import com.paint.paint_backend.Shapes.IShape;
import org.json.JSONException;

public interface Ifactory {
    IShape constructShape(String type, String received_JSON) throws JSONException;
}
