import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Rect } from 'konva/lib/shapes/Rect';
import { stages } from 'konva/lib/Stage';
import { Square } from '../Shapes/square';
import { IFactory } from '../Factory/ifactory';
import { Factory } from '../Factory/factory';


@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {

  stage!: Konva.Stage;
  layer!: Konva.Layer;
  factory: IFactory = new Factory;
  shape!: Konva.Shape;
  IsRectangle! : boolean;

  isNowDrawing: Boolean = false;
  cursor: string = "default";

  shapeList: Konva.Shape[] = [];
  addFlag: Boolean = false;

  constructor() { }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--wbCursor', "crosshair");
    this.stage = new Konva.Stage({
      height: 637,
      width: 1536,
      container: "konva-holder"
    });
  
    this.layer = new Konva.Layer;

    this.stage.add(this.layer);
  }

  selector(){
    
  }

  line(){
    this.shape = new Konva.Line;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  circle(){
    this.shape = new Konva.Circle;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  ellipse(){
    this.shape = new Konva.Ellipse;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  triangle(){
    this.shape = new Konva.Shape;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  square(){
    this.IsRectangle = false;
    this.shape = new Konva.Rect;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  rect(){
    this.IsRectangle = true;
    this.shape = new Konva.Rect;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }

  mouseDownHandler(){
    if(this.shape instanceof Konva.Rect || this.shape instanceof Konva.RegularPolygon || 
      this.shape instanceof Konva.Circle || this.shape instanceof Konva.Ellipse || 
      this.shape instanceof Konva.Line){
        this.isNowDrawing = true;
    }
    if(this.shape instanceof Konva.Rect && !this.IsRectangle){
      this.shape = this.factory.constructKonvaShape("square", this.stage);
    }else if(this.shape instanceof Konva.Circle){
      this.shape = this.factory.constructKonvaShape("circle", this.stage);
    }else if(this.shape instanceof Konva.Ellipse){
      this.shape = this.factory.constructKonvaShape("ellipse", this.stage);
    }else if(this.shape instanceof Konva.Rect && this.IsRectangle){
      this.shape = this.factory.constructKonvaShape("rectangle", this.stage);
    }else if(this.shape instanceof Konva.Line){
      this.shape = this.factory.constructKonvaShape("line", this.stage);
    }else{
      return;
    }
    this.addShape(this.shape);
  }

  mouseMoveHandler(){
    if(!this.isNowDrawing){
      for(let shape of this.shapeList){
        if((shape instanceof Konva.Rect) && (this.stage.getPointerPosition()?.x as number) > shape.x() && 
        (this.stage.getPointerPosition()?.x as number) < shape.x() + shape.width() &&
        (this.stage.getPointerPosition()?.y as number) > shape.y() &&
        (this.stage.getPointerPosition()?.y as number) < shape.y() + shape.height()){
          document.documentElement.style.setProperty('--wbCursor', "grab");
          break;
        }else{
          document.documentElement.style.setProperty('--wbCursor', "crosshair");
        }
      }
      return;
    }
    if(this.shape instanceof Konva.Rect && !this.IsRectangle){
      const newWidth: number = Math.abs((this.stage.getPointerPosition()?.x as number) - this.shape.x());
      const newheight: number = Math.abs((this.stage.getPointerPosition()?.y as number) - this.shape.y());
      if((this.stage.getPointerPosition()?.x as number) > this.shape.x()){
        if((this.stage.getPointerPosition()?.y as number) > this.shape.y())
          if(newWidth < newheight)
            this.shape.width(newWidth).height(newWidth);
          else
           this.shape.width(newheight).height(newheight);
        else
          if(newWidth < newheight)
            this.shape.width(newWidth).height(-newWidth);
          else
            this.shape.width(newheight).height(-newheight);
      }else{
        if((this.stage.getPointerPosition()?.y as number) > this.shape.y())
          if(newWidth < newheight)
            this.shape.width(-newWidth).height(newWidth);
          else
            this.shape.width(-newheight).height(newheight);
        else
          if(newWidth < newheight)
            this.shape.width(-newWidth).height(-newWidth);
          else
            this.shape.width(-newheight).height(-newheight);
      }
      this.addFlag = true;
    }else if(this.shape instanceof Konva.Rect && this.IsRectangle){
      const newWidth: number = (this.stage.getPointerPosition()?.x as number) - this.shape.x();
      const newheight: number = (this.stage.getPointerPosition()?.y as number) - this.shape.y();
      this.shape.width(newWidth).height(newheight);
      this.addFlag = true;
    }
    else if(this.shape instanceof Konva.Circle){
      const rise: number = Math.pow((this.stage.getPointerPosition()?.x as number) - this.shape.x(), 2);
      const run: number = Math.pow((this.stage.getPointerPosition()?.y as number) - this.shape.y(), 2);
      const newRadius: number = Math.sqrt(rise + run);
      this.shape.radius(newRadius);
      this.addFlag = true;
    }else if(this.shape instanceof Konva.Ellipse){
      const newRadiusX: number = Math.abs((this.stage.getPointerPosition()?.x as number) - this.shape.x());
      const newRadiusY: number = Math.abs((this.stage.getPointerPosition()?.y as number) - this.shape.y());
      this.shape.radiusX(newRadiusX);
      this.shape.radiusY(newRadiusY);
      this.addFlag = true;
    }else if(this.shape instanceof Konva.Line){
      const newX: number = (this.stage.getPointerPosition()?.x as number) - this.shape.x();
      const newY: number = (this.stage.getPointerPosition()?.y as number) - this.shape.y();
      this.shape.points([0,0,newX,newY]);
    }
    else{
      return;
    }
    this.layer.batchDraw();
  }

  mouseUpHandler(){
    if(this.isNowDrawing = true && this.addFlag){
      this.isNowDrawing = false;
      this.shapeList.push(this.shape);
      this.addFlag = false;
    }
    this.shape = new Konva.Shape;
    for(let shape of this.shapeList){
      shape.draggable(true);
    }
  }

  addShape(konvaShape: Konva.Shape) {
    this.layer.add(konvaShape).batchDraw;
    this.stage.add(this.layer);
  }

  clearScreen(){
    this.layer.destroy();
    while(this.shapeList.length != 0) this.shapeList.pop();
  }

}
