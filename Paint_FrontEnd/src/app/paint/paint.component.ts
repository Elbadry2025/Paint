import { Component, HostListener, OnInit } from '@angular/core';
import Konva from 'konva';
import { Rect } from 'konva/lib/shapes/Rect';
import { stages } from 'konva/lib/Stage';
import { Square } from '../Shapes/square';
import { IFactory } from '../Factory/ifactory';
import { Factory } from '../Factory/factory';
import { SendService } from '../Service/send.service';
import { IShape } from '../Shapes/ishape';
import { RecieveService } from '../Service/recieve.service';
import { Shape, ShapeConfig } from 'konva/lib/Shape';
import { GetSet } from 'konva/lib/types';


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
  prevShape!: Konva.Shape;
  selectedShape: any = null;

  isRectangle!: boolean;
  isTriangle!: boolean;
  isBrush!: boolean;
  isSelecting!: boolean;
  isFill!: boolean;
  isErase! : boolean;
  isCopy!: boolean;
  isPaste!: boolean;

  font!: number;
  font_temp!:number;
  newColor: string = "black";
  red: number = 0
  green: number = 0;
  blue: number = 0;
  op: string = "none";

  x!: number;
  y!: number;
  width!: number;
  height!: number;

  isNowDrawing: Boolean = false;
  cursor: string = "default";

  shapeList: Konva.Shape[] = [];

  addFlag: Boolean = false;

  constructor(private shapeServiceSend: SendService, private shapeServiceRecieve: RecieveService) { }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--wbCursor', "crosshair");
    this.stage = new Konva.Stage({
      height: 600,
      width: 1400,
      container: "konva-holder"
    });
  
    this.layer = new Konva.Layer;

    this.tr = new Konva.Transformer;
    this.layer.add(this.tr);

    this.stage.add(this.layer);
    this.shapeServiceSend.restart().subscribe(() => {
      console.log("System Restarted successfully");
    })
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
  @HostListener('window:keydown.p', ['$event']) select() {
    this.selector();
  }
  selector(){
    this.shape = null;
    this.clear();
    this.isSelecting = true;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
    this.op = "Selector";
  }
  @HostListener('window:keydown.Control.c', ['$event']) co() {
    this.copy();
  }

  @HostListener('window:keydown.Control.v', ['$event']) pa() {
    this.paste();
  }
  copy(){
    this.clear();
    this.isSelecting = true;
    this.isCopy = true;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
    this.op = "Copy";
  }
  paste(){
    this.clear();
    this.isPaste = true;
    this.op = "Paste";
  }
  line(){
    this.clear();
    this.shape = new Konva.Line;
    this.prevShape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
    this.op = "Line";
  }
  @HostListener('window:keydown.i', ['$event']) l() {
    this.line();
  }
  circle(){
    this.clear();
    this.shape = new Konva.Circle;
    this.prevShape = this.shape;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
    this.op = "Circle";
  }
  @HostListener('window:keydown.c', ['$event']) c() {
    this.circle();
  }
  ellipse(){
    this.clear();
    this.shape = new Konva.Ellipse;
    this.prevShape = this.shape;
    for(let shape of this.shapeList){
      shape.draggable(false);
    }
    this.op = "Ellipse";
  }
  @HostListener('window:keydown.e', ['$event']) e() {
    this.ellipse();
  }
  triangle(){
    this.clear();
    this.isTriangle = true;
    this.shape = new Konva.Line;
    this.prevShape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
    this.op = "Triangle";
  }
  @HostListener('window:keydown.t', ['$event']) t() {
    this.triangle();
  }
  square() {
    this.clear();
    this.shape = new Konva.Rect;
    this.prevShape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
    this.op = "Square";
  }
  @HostListener('window:keydown.s', ['$event']) s() {
    this.square();
  }
  rect() {
    this.clear();
    this.isRectangle = true;
    this.shape = new Konva.Rect;
    this.prevShape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
    this.op = "Rectangle";
  }
  @HostListener('window:keydown.r', ['$event']) r() {
    this.rect();
  }
  brush() {
    this.clear();
    this.isBrush = true;
    this.shape = new Konva.Line;
    this.prevShape = this.shape;
    for (let shape of this.shapeList) {
      shape.draggable(false);
    }
    this.op = "Brush";
  }
  @HostListener('window:keydown.b', ['$event']) b() {
    this.brush();
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
    if(x == null){}
    else x.style.backgroundColor = this.newColor;
    this.newColor;
  }
  setFont(item: any){
    if(item.target.value == 0){
      this.font = 2;
    }else if(item.target.value == 5){
      this.font = 5;
    }else if(item.target.value == 10){
      this.font = 10;
    }else if(item.target.value == 15){
      this.font = 15;
    }else if(item.target.value == 20){
      this.font = 20;
    }else if(item.target.value == 25){
      this.font = 25;
    }
  }
  @HostListener('window:keydown.f', ['$event']) fi() {
    this.Fill();
  }
  Fill(){
    this.clear();
    this.isFill = true;
    this.isSelecting = true;
    this.op = "Fill";
  }
  @HostListener('window:keydown.Delete', ['$event']) de() {
    this.Erase();
  }
  Erase(){
    this.clear();
    this.isErase = true;
    this.isSelecting = true;
    this.op = "Eraser";
  }

  mouseDownHandler(){
    if(this.isSelecting){
      this.stage.on("click", (e) => {
        if(!(e.target instanceof Konva.Shape)){
          this.tr.nodes([]);
        }
        if(e.target instanceof Konva.Shape && !this.isFill && !this.isErase){
          this.tr.nodes([e.target]);
          for (let shape of this.shapeList) {
            shape.draggable(false);
          }
          e.target.draggable(true);
          this.selectedShape = e.target;
          this.x = e.target.x();
          this.y = e.target.y();
        }
        if(e.target instanceof Konva.Shape && this.isFill){
          let t = "";
          if(e.target instanceof Konva.Rect){
            if(Math.abs(e.target.width() - e.target.height()) < 0.1){
              t = "square";
            }else t = "rectangle"
          }else if(e.target instanceof Konva.Circle) t = "circle";
          else if(e.target instanceof Konva.Ellipse) t = "ellipse";
          else if(e.target instanceof Konva.Line){
            if(e.target.closed()) t = "triangle"
            else t = "line"
          }
          if(t == "line") return;
          this.shapeServiceSend.deleteShape(this.factory.constructBackEndShape(t, e.target, true, false), true).subscribe(response => {
            console.log(response);
          });
          e.target.fill(this.newColor);
          this.shapeServiceSend.sendShape(this.factory.constructBackEndShape(t, e.target, true, false)).subscribe(response => {
            console.log(response);
          })
          this.isFill = false;
          return;
        }
        if(e.target instanceof Konva.Shape && this.isErase){
          let t = "";
          if(e.target instanceof Konva.Rect){
            if(Math.abs(e.target.width() - e.target.height()) < 0.1){
              t = "square";
            }else t = "rectangle"
          }else if(e.target instanceof Konva.Circle) t = "circle";
          else if(e.target instanceof Konva.Ellipse) t = "ellipse";
          else if(e.target instanceof Konva.Line){
            if(e.target.closed()) t = "triangle"
            else t = "line"
          }
          this.shapeServiceSend.sendShape(this.factory.constructBackEndShape(t, e.target, false, true)).subscribe(response => {
            console.log(response);
          })
          e.target.x(-9999).y(-9999);
          const index = this.shapeList.indexOf(e.target);
          this.shapeList.splice(index, 1);
          this.isErase = false;
          return;
        }
        if(e.target instanceof Konva.Shape && this.isCopy){
          this.copyShape = e.target;
          console.log('copy complete');
          return;
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
    }else{
      this.shape = this.prevShape;
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
        this.shape.strokeWidth(this.font);
      }
      if(this.isPaste){
        this.shape.id(this.factory.getAvailableID());
      }
      this.addShape(this.shape);
    }
  }
  mouseMoveHandler(){
    if(this.isCopy) return;
    if(!this.isPaste){
      if (this.isSelecting && !this.isNowDrawing) {
        this.stage.on("mousemove", (e) => {
          if(e.target instanceof Konva.Shape){
            document.documentElement.style.setProperty('--wbCursor', "pointer");
          }else{
            document.documentElement.style.setProperty('--wbCursor', "crosshair");
          }
        })
      return;
      }else if(this.isNowDrawing){
        if (this.shape instanceof Konva.Rect && !this.isRectangle) {
          const newWidth: number = Math.abs((this.stage.getPointerPosition()?.x as number) - this.shape.x());
          const newheight: number = Math.abs((this.stage.getPointerPosition()?.y as number) - this.shape.y());
          this.shape.width(newWidth).height(newWidth);
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
        } else {
          return;
        }
      }
    }
    this.layer.batchDraw();
  }

  mouseUpHandler(){
    if(this.isCopy) return;
    if(this.tr.nodes().length > 0){
      this.stage.on("mouseup", (e) => {
        if(e.target instanceof Konva.Shape && this.selectedShape instanceof Konva.Shape){
          if(e.target.x() != this.x || e.target.y() != this.y){
            let t = "";
            if(this.selectedShape instanceof Konva.Rect){
              if(Math.abs(this.selectedShape.width() - this.selectedShape.height()) < 0.1){
                t = "square";
              }else t = "rectangle"
            }else if(this.selectedShape instanceof Konva.Circle) t = "circle";
            else if(this.selectedShape instanceof Konva.Ellipse) t = "ellipse";
            else if(this.selectedShape instanceof Konva.Line){
              if(this.selectedShape.closed()) t = "triangle"
              else t = "line"
            }
            let x1 = e.target.x();
            let y1 = e.target.y();
            e.target.x(this.x).y(this.y);
            this.shapeServiceSend.deleteShape(this.factory.constructBackEndShape(t, e.target, true, false), true).subscribe(response => {
              console.log(response);
            });
            e.target.x(x1).y(y1);
            this.shapeServiceSend.sendShape(this.factory.constructBackEndShape(t, e.target, true, false)).subscribe(response => {
              console.log(response);
            })
          }
          this.selectedShape = null;
          e.target.draggable(false);
          this.tr.nodes([]);
          return;
        }
      })
    }
    if(this.isNowDrawing = true && this.addFlag || this.isPaste){
      if(this.isPaste){
        this.tr.nodes([]);
      }
      this.isNowDrawing = false;
      this.shapeList.push(this.shape);
      this.addFlag = false;
      var t = "";
          if(this.shape instanceof Konva.Rect){
            if(Math.abs(this.shape.width() - this.shape.height()) < 0.1){
              t = "square";
            }else t = "rectangle"
          }else if(this.shape instanceof Konva.Circle) t = "circle";
          else if(this.shape instanceof Konva.Ellipse) t = "ellipse";
          else if(this.shape instanceof Konva.Line){
            if(this.shape.closed()) t = "triangle"
            else t = "line"
          }
      this.shapeServiceSend.sendShape(this.factory.constructBackEndShape(t, this.shape, false, false)).subscribe(result => {
        console.log(result);
      })
      for(let shape of this.shapeList){
        shape.draggable(false);
      }
    }
    this.shape = null;
  }

  @HostListener('window:keydown.Control.z', ['$event']) cz() {
    this.undo();
  }

  @HostListener('window:keydown.Control.y', ['$event']) cy() {
    this.redo();
  }

  undo(){
    this.shapeServiceRecieve.undo().subscribe(result => {
      if(result == "Error"){
        console.log("Error: Nothing to Undo");
      }else{
        let recievedShape = JSON.parse(result);
        if(!recievedShape._update){
          if(!recievedShape._deleteflag){
            console.log(recievedShape._id);
            console.log(this.shapeList);
            for(let shape of this.shapeList){
              if(shape.id() == recievedShape._id){
                shape.x(-9999).y(-9999);
                const index = this.shapeList.indexOf(shape);
                this.shapeList.splice(index, 1);
                break;
              }
            }
          }else{
            console.log(recievedShape._id);
            console.log(this.shapeList);
            let addedShape: Konva.Shape;
            if(recievedShape._type == "square"){
              addedShape = this.factory.constructSquareFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._sideLength);
            }else if(recievedShape._type == "rectangle"){
              addedShape = this.factory.constructRectangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._width, recievedShape._height);
            }else if(recievedShape._type == "circle"){
              addedShape = this.factory.constructCircleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radius);
            }else if(recievedShape._type == "ellipse"){
              addedShape = this.factory.constructEllipseFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radiusX, recievedShape._radiusY);
            }else if(recievedShape._type == "triangle"){
              addedShape = this.factory.constructTriangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
            }else{
              addedShape = this.factory.constructLineFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
            }
            this.addShape(addedShape);
            this.shapeList.push(addedShape);
          }
        }else{
          console.log(recievedShape);
          for(let shape of this.shapeList){
            if(shape.id() == recievedShape._id){
              this.shapeServiceSend.deleteShape(this.factory.constructBackEndShape(recievedShape._type, shape, true, false), false).subscribe(response => {
                console.log(response);
              });
              shape.x(-9999).y(-9999);
              const index = this.shapeList.indexOf(shape);
              this.shapeList.splice(index, 1);
              break;
            }
          }
          let addedShape: Konva.Shape;
          if(recievedShape._type == "square"){
            addedShape = this.factory.constructSquareFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._sideLength);
          }else if(recievedShape._type == "rectangle"){
            addedShape = this.factory.constructRectangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._width, recievedShape._height);
          }else if(recievedShape._type == "circle"){
            addedShape = this.factory.constructCircleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radius);
          }else if(recievedShape._type == "ellipse"){
            addedShape = this.factory.constructEllipseFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radiusX, recievedShape._radiusY);
          }else if(recievedShape._type == "triangle"){
            addedShape = this.factory.constructTriangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
          }else{
            addedShape = this.factory.constructLineFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
          }
          this.addShape(addedShape);
          this.shapeList.push(addedShape);
        }
      }
    })
  }

  redo(){
    this.shapeServiceRecieve.redo().subscribe(result => {
      if(result == "Error"){
        console.log("Error: Nothing to Redo");
      }else{
        let recievedShape = JSON.parse(result);
        if(!recievedShape._update){
          if(!recievedShape._deleteflag){
            let addedShape: Konva.Shape;
            if(recievedShape._type == "square"){
              addedShape = this.factory.constructSquareFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._sideLength);
            }else if(recievedShape._type == "rectangle"){
              addedShape = this.factory.constructRectangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._width, recievedShape._height);
            }else if(recievedShape._type == "circle"){
              addedShape = this.factory.constructCircleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radius);
            }else if(recievedShape._type == "ellipse"){
              addedShape = this.factory.constructEllipseFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radiusX, recievedShape._radiusY);
            }else if(recievedShape._type == "triangle"){
              addedShape = this.factory.constructTriangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
            }else{
              addedShape = this.factory.constructLineFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
                recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
            }
            this.addShape(addedShape);
            this.shapeList.push(addedShape);
          }else{
            console.log(recievedShape._id);
            console.log(this.shapeList);
            for(let shape of this.shapeList){
              if(shape.id() == recievedShape._id){
                shape.x(-9999).y(-9999);
                const index = this.shapeList.indexOf(shape);
                this.shapeList.splice(index, 1);
                break;
              }
            }
          }
        }else{
          for(let shape of this.shapeList){
            if(shape.id() == recievedShape._id){
              this.shapeServiceSend.deleteShape(this.factory.constructBackEndShape(recievedShape._type, shape, true, false), true).subscribe(response => {
                console.log(response);
              });
              shape.x(-9999).y(-9999);
              const index = this.shapeList.indexOf(shape);
              this.shapeList.splice(index, 1);
              break;
            }
          }
          let addedShape: Konva.Shape;
          if(recievedShape._type == "square"){
            addedShape = this.factory.constructSquareFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._sideLength);
          }else if(recievedShape._type == "rectangle"){
            addedShape = this.factory.constructRectangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._width, recievedShape._height);
          }else if(recievedShape._type == "circle"){
            addedShape = this.factory.constructCircleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radius);
          }else if(recievedShape._type == "ellipse"){
            addedShape = this.factory.constructEllipseFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radiusX, recievedShape._radiusY);
          }else if(recievedShape._type == "triangle"){
            addedShape = this.factory.constructTriangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
          }else{
            addedShape = this.factory.constructLineFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
              recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
          }
          this.addShape(addedShape);
          this.shapeList.push(addedShape);
        }
      }
    })
  }

  addShape(konvaShape: Konva.Shape) {
    this.layer.add(konvaShape).batchDraw;
    this.stage.add(this.layer);
  }

  @HostListener('window:keydown.Control.s', ['$event']) sa(e: any) {
    e.preventDefault();
    this.save();
  }

  @HostListener('window:keydown.Control.o', ['$event']) lo(e: any) {
    e.preventDefault();
    this.load();
  }

  save(){
    this.shapeServiceSend.save().subscribe();
  }

  load(){
    this.layer.destroy();
    this.stage.remove();
    this.ngOnInit();
    this.shapeList = [];
    let recievedData: any;
    this.shapeServiceRecieve.load().subscribe(response => {
      let x = JSON.stringify(response);
      recievedData = JSON.parse(x);
      for (let recievedShape of recievedData) {
        let addedShape;
        this.shapeList = this.shapeList.filter(({id}) => id !== recievedShape.key);
        if(recievedShape._type == "square"){
          addedShape = this.factory.constructSquareFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
            recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._sideLength);
        }else if(recievedShape._type == "rectangle"){
          addedShape = this.factory.constructRectangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
            recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._width, recievedShape._height);
        }else if(recievedShape._type == "circle"){
          addedShape = this.factory.constructCircleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
            recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radius);
        }else if(recievedShape._type == "ellipse"){
          addedShape = this.factory.constructEllipseFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
            recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._radiusX, recievedShape._radiusY);
        }else if(recievedShape._type == "triangle"){
          addedShape = this.factory.constructTriangleFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
            recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
        }else{
          addedShape = this.factory.constructLineFromBack(recievedShape._x,recievedShape._y,recievedShape._stroke,recievedShape._strokeWidth,recievedShape._fill,
            recievedShape._rotate, recievedShape._draggable, recievedShape._id, recievedShape._type, recievedShape._points);
        }
        this.addShape(addedShape);
        this.shapeList.push(addedShape);
      }
      let t = "";
      for(let shape of this.shapeList){
        if(shape instanceof Konva.Rect){
          if(Math.abs(shape.width() - shape.height()) < 0.1){
            t = "square";
          }else t = "rectangle"
        }else if(shape instanceof Konva.Circle) t = "circle";
        else if(shape instanceof Konva.Ellipse) t = "ellipse";
        else if(shape instanceof Konva.Line){
          if(shape.closed()) t = "triangle"
          else t = "line"
        }
        this.shapeServiceSend.sendShape(this.factory.constructBackEndShape(t, shape, false, true)).subscribe(response => {
          console.log(response);
        })
      }
    });
  }

  clearScreen(){
    for(let shape of this.shapeList){
      let t = "";
      if(shape instanceof Konva.Rect){
        if(Math.abs(shape.width() - shape.height()) < 0.1){
          t = "square";
        }else t = "rectangle"
      }else if(shape instanceof Konva.Circle) t = "circle";
      else if(shape instanceof Konva.Ellipse) t = "ellipse";
      else if(shape instanceof Konva.Line){
        if(shape.closed()) t = "triangle"
        else t = "line"
      }
      this.shapeServiceSend.sendShape(this.factory.constructBackEndShape(t, shape, false, true)).subscribe(response => {
        console.log(response);
      })
      shape.x(-9999).y(-9999);
    }
    while(this.shapeList.length > 0) this.shapeList.pop();
  }
}
