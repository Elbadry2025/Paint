package com.paint.paint_backend;

import com.paint.paint_backend.Shapes.IShape;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/connect")
public class Controller {
    @PostMapping("/create/{type}")
    public String addShape(@RequestBody IShape shape, @PathVariable String type){
        return ShapeService.addShape(shape);
    }

}
