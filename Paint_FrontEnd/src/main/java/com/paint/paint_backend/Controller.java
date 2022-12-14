package com.paint.paint_backend;

import com.paint.paint_backend.Shapes.IShape;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/connect")
public class Controller {

    @PostMapping("/create/{type}")
    @ResponseBody
    public String addShape(@RequestBody String receivedJSON, @PathVariable String type) throws JSONException {
        return ShapeService.addShape(receivedJSON, type);
    }

    @PostMapping("/delete/{type}/{UR}")
    @ResponseBody
    public String deleteShape(@RequestBody String receivedJSON, @PathVariable String type, @PathVariable boolean UR) throws JSONException {
        return ShapeService.deleteShape(receivedJSON, UR, type);
    }

    @PostMapping("/save")
    @ResponseBody
    public void save() throws IOException {
        ShapeService.save();
    }

    @GetMapping("/load")
    @ResponseBody
    public String load() throws IOException {
        return ShapeService.load();
    }

    @GetMapping("/undo")
    public String undo(){
        return ShapeService.undo();
    }

    @GetMapping("/redo")
    public String redo(){
        return ShapeService.redo();
    }

    @PostMapping("/restart")
    public void restart() {
        ShapeService.restart();
    }
}
