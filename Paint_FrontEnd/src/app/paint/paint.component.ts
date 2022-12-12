import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Rect } from 'konva/lib/shapes/Rect';
import { stages } from 'konva/lib/Stage';
import { Square } from '../Shapes/square';
import { IFactory } from '../Factory/ifactory';
import { Factory } from '../Factory/factory';
import { SendService } from '../Service/send.service';
import { FormsModule } from '@angular/forms'
import { FastLayer } from 'konva/lib/FastLayer';


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
  copyShape!: Konva.Shape;
  prev_shape!: Konva.Shape;

  isRectangle!: boolean;
  isTriangle!: boolean;
  isBrush!: boolean;
  isSelecting!: boolean;
  isFill!: boolean;
  isErase! : boolean;
  isCopy!: boolean;
  isPaste!: boolean;
  
  newColor: string = "black";
  red: number = 0
  green: number = 0;
  blue: number = 0;

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

  clear(){
    this.isTriangle = false;
    this.isBrush = false;
    this.isSelecting = false;
    this.isErase = false;
    this.isFill = false;
    this.isCopy = false;
    this.isPaste = false;
    this.isRectangle = false;
  }
  selector(){
    this.shape = null;
    this.clear();
    this.isSelecting = true;
    for (let shape of this.shapeList) {
      shape.draggable(true);
    }
  }
  copy(){
    this.clear();
    this.isSelecting = true;
    this.isCopy = true;
  }
  paste(){
    this.clear();
    this.isPaste = true;
  }
  line(){
    this.clear();
    this.shape = new Konva.Line;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  circle(){
    this.clear();
    this.shape = new Konva.Circle;
    this.prev_shape = this.shape;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  ellipse(){
    this.clear();
    this.shape = new Konva.Ellipse;
    this.prev_shape = this.shape;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
  }
  triangle(){
    this.clear();
    this.isTriangle = true;
    this.shape = new Konva.Line;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  square() {
    this.clear();
    this.shape = new Konva.Rect;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  rect() {
    this.clear();
    this.isRectangle = true;
    this.shape = new Konva.Rect;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  brush() {
    this.clear();
    this.isBrush = true;
    this.shape = new Konva.Line;
    this.prev_shape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
  }
  coloring(color: string) {
    this.newColor = color;
    var x = document.getElementById('box');
    if(x == null){

    }else
      x.style.backgroundColor = this.newColor;
    this.newColor;
  }
  setRed(event : any){
    this.red = event.target.value;
    this.rgb(this.red,this.green,this.blue);
  }
  setGreen(event : any){
    this.green = event.target.value;
    this.rgb(this.red,this.green,this.blue);
  }
  setBlue(event : any){
    this.blue = event.target.value;
    this.rgb(this.red,this.green,this.blue);
  }
  rgb(red : number, green : number, blue : number ){
    this.newColor= 'rgb('+red+','+green+','+blue+')';
    console.log(this.newColor);
    var x = document.getElementById('box');
    if(x == null){

    }else
      x.style.backgroundColor = this.newColor;
    this.newColor;
  }
  Fill(){
    this.clear();
    this.isFill = true;
    this.isSelecting = true;
  }
  Erase(){
    this.clear();
    this.isErase = true;
    this.isSelecting = true;
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
        if(e.target instanceof Konva.Shape && !this.isFill && !this.isErase){
          this.tr.nodes([e.target]);
        }
        if(e.target instanceof Konva.Shape && this.isFill){
          e.target.fill(this.newColor);
        }
        if(e.target instanceof Konva.Shape && this.isErase){
          e.target.destroy();
        }
        if(e.target instanceof Konva.Shape && this.isCopy){
          this.copyShape = e.target;
          console.log('copy complete');
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
    if(this.isPaste){
      console.log('paste complete');
      this.shape = this.copyShape;

    }
    if (this.shape instanceof Konva.Rect && !this.isRectangle) {
      this.shape = this.factory.constructKonvaShape("square", this.stage, this.isPaste, this.copyShape);
    } else if (this.shape instanceof Konva.Circle) {
      this.shape = this.factory.constructKonvaShape("circle", this.stage, this.isPaste, this.copyShape);
    } else if (this.shape instanceof Konva.Ellipse) {
      this.shape = this.factory.constructKonvaShape("ellipse", this.stage, this.isPaste, this.copyShape);
    } else if (this.shape instanceof Konva.Rect && this.isRectangle) {
      this.shape = this.factory.constructKonvaShape("rectangle", this.stage, this.isPaste, this.copyShape);
    } else if (this.shape instanceof Konva.Line && !this.isTriangle && !this.isBrush) {
      this.shape = this.factory.constructKonvaShape("line", this.stage, this.isPaste, this.copyShape);
    } else if (this.shape instanceof Konva.Line && this.isTriangle && !this.isBrush) {
      this.shape = this.factory.constructKonvaShape("triangle", this.stage, this.isPaste, this.copyShape);
    } else if (this.shape instanceof Konva.Line && !this.isTriangle && this.isBrush) {
      this.shape = this.factory.constructKonvaShape("brush", this.stage, this.isPaste, this.copyShape);
    } else {
      return;
    }
    if(!this.isPaste){
      this.shape.stroke(this.newColor);
    }
    this.addShape(this.shape);
  }

  mouseMoveHandler(){
    if(!this.isPaste){
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
    this.stage.destroy();
    while(this.shapeList.length != 0) this.shapeList.pop();
    this.ngOnInit();
  }

}
