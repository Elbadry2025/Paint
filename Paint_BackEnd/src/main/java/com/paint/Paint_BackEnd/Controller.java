package com.paint.paint_backend;

import com.paint.paint_backend.Shapes.IShape;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/connect")
public class Controller {

    @PostMapping("/create/{type}")
    @ResponseBody
    public String addShape(@RequestBody String receivedJSON, @PathVariable String type) throws JSONException {
        return ShapeService.addShape(receivedJSON);
    }

    @PostMapping("/create/restart")
    public void restart(){
        ShapeService.restart();
    }

    @GetMapping("/undo")
    public String undo(){
        return ShapeService.undo();
    }

    @GetMapping("/redo")
    public String redo(){
        return ShapeService.redo();
    }

}
