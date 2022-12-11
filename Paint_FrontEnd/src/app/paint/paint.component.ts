import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Rect } from 'konva/lib/shapes/Rect';
import { stages } from 'konva/lib/Stage';
import { Square } from '../Shapes/square';
import { IFactory } from '../Factory/ifactory';
import { Factory } from '../Factory/factory';
import { SendService } from '../Service/send.service';


@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {

  stage!: Konva.Stage;
  layer!: Konva.Layer;
  tr!: Konva.Transformer;

  factory: IFactory = new Factory;
  shape: any;
  prev_shape!: Konva.Shape;

  isRectangle!: boolean;
  isTriangle!: boolean;
  isBrush!: boolean;
  isSelecting!: boolean;

  newColor: string = "black";

  isNowDrawing: Boolean = false;
  cursor: string = "default";

  shapeList: Konva.Shape[] = [];
  addFlag: Boolean = false;

  constructor(private shapeService: SendService) { }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--wbCursor', "crosshair");
    this.stage = new Konva.Stage({
      height: 637,
      width: 1536,
      container: "konva-holder"
    });
  
    this.layer = new Konva.Layer;

    this.stage.add(this.layer);

    this.tr = new Konva.Transformer;
  }

  selector(){
    this.isTriangle = false;
    this.isBrush = false;
    this.shape = null;
    this.isSelecting = true;
    for (let shape of this.shapeList) {
      shape.draggable(true);
    }
  }
  line(){
    this.isSelecting = false;
    this.isTriangle = false;
    this.isBrush = false;
    this.shape = new Konva.Line;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  circle(){
    this.isSelecting = false;
    this.shape = new Konva.Circle;
    this.prev_shape = this.shape;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  ellipse(){
    this.isSelecting = false;
    this.shape = new Konva.Ellipse;
    this.prev_shape = this.shape;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  triangle(){
    this.isSelecting = false;
    this.isTriangle = true;
    this.isBrush = false;
    this.shape = new Konva.Line;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  square() {
    this.isSelecting = false;
    this.isRectangle = false;
    this.shape = new Konva.Rect;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  rect() {
    this.isSelecting = false;
    this.isRectangle = true;
    this.shape = new Konva.Rect;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  brush() {
    this.isSelecting = false;
    this.isBrush = true;
    this.isTriangle = false;
    this.shape = new Konva.Line;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  coloring(color: string) {
    this.newColor = color;
  }

  mouseDownHandler(){
    if(this.isSelecting){
      for(let shape of this.shapeList){
        shape.draggable(true);
      }
      this.stage.on("click", (e) => {
        if(!(e.target instanceof Konva.Shape)){
          this.tr.nodes([]);
        }
        if(e.target instanceof Konva.Shape){
          this.tr.nodes([e.target]);
        }
        this.tr.setAttrs({
          keepRatio: false,
          enabledAnchors:[
            'top-left',
            'top-center',
            'top-right',
            'middle-right',
            'middle-left',
            'bottom-left',
            'bottom-center',
            'bottom-right'
          ]
        })
      })
      this.layer.add(this.tr);
      this.stage.add(this.layer);
    }
    this.shape = this.prev_shape;
    if(this.shape instanceof Konva.Rect || this.shape instanceof Konva.RegularPolygon || 
      this.shape instanceof Konva.Circle || this.shape instanceof Konva.Ellipse || 
      this.shape instanceof Konva.Line){
        this.isNowDrawing = true;
    }
    if (this.shape instanceof Konva.Rect && !this.isRectangle) {
      this.shape = this.factory.constructKonvaShape("square", this.stage);
    } else if (this.shape instanceof Konva.Circle) {
      this.shape = this.factory.constructKonvaShape("circle", this.stage);
    } else if (this.shape instanceof Konva.Ellipse) {
      this.shape = this.factory.constructKonvaShape("ellipse", this.stage);
    } else if (this.shape instanceof Konva.Rect && this.isRectangle) {
      this.shape = this.factory.constructKonvaShape("rectangle", this.stage);
    } else if (this.shape instanceof Konva.Line && !this.isTriangle && !this.isBrush) {
      this.shape = this.factory.constructKonvaShape("line", this.stage);
    } else if (this.shape instanceof Konva.Line && this.isTriangle && !this.isBrush) {
      this.shape = this.factory.constructKonvaShape("triangle", this.stage);
    } else if (this.shape instanceof Konva.Line && !this.isTriangle && this.isBrush) {
      this.shape = this.factory.constructKonvaShape("brush", this.stage);
    } else {
      return;
    }
    this.shape.stroke(this.newColor);
    this.addShape(this.shape);
  }

  mouseMoveHandler(){
    if (this.isSelecting) {
      for (let shape of this.shapeList) {
        if ((shape instanceof Konva.Rect) && (this.stage.getPointerPosition()?.x as number) > shape.x() &&
          (this.stage.getPointerPosition()?.x as number) < shape.x() + shape.width() &&
          (this.stage.getPointerPosition()?.y as number) > shape.y() &&
          (this.stage.getPointerPosition()?.y as number) < shape.y() + shape.height()) {
          document.documentElement.style.setProperty('--wbCursor', "grab");
          break;
        } else {
          document.documentElement.style.setProperty('--wbCursor', "crosshair");
        }
      }
      return;
    }
    if (this.shape instanceof Konva.Rect && !this.isRectangle) {
      const newWidth: number = Math.abs((this.stage.getPointerPosition()?.x as number) - this.shape.x());
      const newheight: number = Math.abs((this.stage.getPointerPosition()?.y as number) - this.shape.y());
      if ((this.stage.getPointerPosition()?.x as number) > this.shape.x()) {
        if ((this.stage.getPointerPosition()?.y as number) > this.shape.y())
          if (newWidth < newheight)
            this.shape.width(newWidth).height(newWidth);
          else
            this.shape.width(newheight).height(newheight);
        else
          if (newWidth < newheight)
            this.shape.width(newWidth).height(-newWidth);
          else
            this.shape.width(newheight).height(-newheight);
      } else {
        if ((this.stage.getPointerPosition()?.y as number) > this.shape.y())
          if (newWidth < newheight)
            this.shape.width(-newWidth).height(newWidth);
          else
            this.shape.width(-newheight).height(newheight);
        else
          if (newWidth < newheight)
            this.shape.width(-newWidth).height(-newWidth);
          else
            this.shape.width(-newheight).height(-newheight);
      }
      this.addFlag = true;
    } else if (this.shape instanceof Konva.Rect && this.isRectangle) {
      const newWidth: number = (this.stage.getPointerPosition()?.x as number) - this.shape.x();
      const newheight: number = (this.stage.getPointerPosition()?.y as number) - this.shape.y();
      this.shape.width(newWidth).height(newheight);
      this.addFlag = true;
    }
    else if (this.shape instanceof Konva.Circle) {
      const rise: number = Math.pow((this.stage.getPointerPosition()?.x as number) - this.shape.x(), 2);
      const run: number = Math.pow((this.stage.getPointerPosition()?.y as number) - this.shape.y(), 2);
      const newRadius: number = Math.sqrt(rise + run);
      this.shape.radius(newRadius);
      this.addFlag = true;
    } else if (this.shape instanceof Konva.Ellipse) {
      const newRadiusX: number = Math.abs((this.stage.getPointerPosition()?.x as number) - this.shape.x());
      const newRadiusY: number = Math.abs((this.stage.getPointerPosition()?.y as number) - this.shape.y());
      this.shape.radiusX(newRadiusX);
      this.shape.radiusY(newRadiusY);
      this.addFlag = true;
    } else if (this.shape instanceof Konva.Line && !this.isTriangle && !this.isBrush) {
      const newX: number = (this.stage.getPointerPosition()?.x as number) - this.shape.x();
      const newY: number = (this.stage.getPointerPosition()?.y as number) - this.shape.y();
      this.shape.points([0, 0, newX, newY]);
      this.addFlag = true;
    } else if (this.shape instanceof Konva.Line && this.isTriangle && !this.isBrush) {
      const newX: number = (this.stage.getPointerPosition()?.x as number) - this.shape.x();
      const newY: number = (this.stage.getPointerPosition()?.y as number) - this.shape.y();
      this.shape.points([0, 0, newX, 0, newX / 2, newY, 0, 0]);
      this.shape.closed(true);
      this.addFlag = true;
    } else if (this.shape instanceof Konva.Line && !this.isTriangle && this.isBrush) {
      const newX: number = (this.stage.getPointerPosition()?.x as number) - this.shape.x();
      const newY: number = (this.stage.getPointerPosition()?.y as number) - this.shape.y();
      this.shape.points(this.shape.points().concat([newX, newY]));
      this.addFlag = true;
    }
    else {
      return;
    }
    this.layer.batchDraw();
  }

  mouseUpHandler(){
    if(this.isNowDrawing = true && this.addFlag){
      if(this.shape instanceof Konva.Rect){
        if(this.shape.width() < 0){
          this.shape.x(this.shape.x() + this.shape.width()).width(this.shape.width() * -1);
        }
        if(this.shape.height() < 0){
          this.shape.y(this.shape.y() + this.shape.height()).height(this.shape.height() * -1);
        }
      }
      this.isNowDrawing = false;
      this.shapeList.push(this.shape);
      this.addFlag = false;
      this.shapeService.sendShape(this.factory.constructBackEndShape("square")).subscribe(result => {
        console.log(result);
      })
      for(let shape of this.shapeList){
        shape.draggable(false);
      }
    }
    this.shape = null;
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
