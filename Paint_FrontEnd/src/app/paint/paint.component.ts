import { Component, OnInit } from '@angular/core';
import Konva from 'konva';


@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {

  stage!: Konva.Stage;
  layer!: Konva.Layer;
  circule!: Konva.Circle;
  square!: Konva.Rect;
  triangle!: Konva.Line;
  ellipse!: Konva.Ellipse;
  rectangle!: Konva.Rect;
  line!: Konva.Line;
  cursorX!: number;
  cursorY!: number;

  cursorXin!: number;
  cursorYin!: number;

  cursorXfin!: number;
  cursorYfin!: number;

  constructor() { }

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      height: 645,
      width: window.innerWidth,
      container: "konva-holder"
    });
  
    this.layer = new Konva.Layer;

    this.stage.add(this.layer);
  }

  contextmenu = "none";
  contextmenuX = 0;
  contextmenuY = 0;
  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = "block";
  }

  findCursorInitial(event: MouseEvent){
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
    this.cursorXin = event.clientX;
    this.cursorYin = event.clientY;
    console.log(this.cursorX, this.cursorY);
  }

  findCursorFinal(event: MouseEvent){
    this.cursorXfin = event.clientX;
    this.cursorYfin = event.clientY;
  }

  addShape(konvaShape: Konva.Shape) {
    this.layer.add(konvaShape);
    this.stage.add(this.layer);
  }

  cir(){
    if(this.cursorXin != this.cursorXfin || this.cursorYin != this.cursorYfin) return;
    this.circule = new Konva.Circle({
      x: this.stage.getPointerPosition()?.x,
      y: this.stage.getPointerPosition()?.y,
      width: 60,
      height: 30,
      stroke: "black",
      draggable: true
    });
    this.addShape(this.circule);
  }
  squ(){
    if(this.cursorXin != this.cursorXfin || this.cursorYin != this.cursorYfin) return;
    this.square = new Konva.Rect({
      x: this.stage.getPointerPosition()?.x,
      y: this.stage.getPointerPosition()?.y,
      width: 60,
      height: 60,
      stroke: "black",
      draggable: true
    });
    this.addShape(this.square);
  }
  tri(){
    if(this.cursorXin != this.cursorXfin || this.cursorYin != this.cursorYfin) return;
    this.triangle = new Konva.Line({
      x: this.stage.getPointerPosition()?.x,
      y: this.stage.getPointerPosition()?.y,
      width: 60,
      height: 60,
      stroke: "black",
      lineCap: "round",
      lineJoin: "round",
      points:[0,0,150,0,75,-90,0,0],
      draggable: true
    });
    this.addShape(this.triangle);
  }
  li(){
    if(this.cursorXin != this.cursorXfin || this.cursorYin != this.cursorYfin) return;
    this.line = new Konva.Line({
      x: this.stage.getPointerPosition()?.x,
      y: this.stage.getPointerPosition()?.y,
      width: 60,
      height: 60,
      stroke: "black",
      lineCap: "round",
      lineJoin: "round",
      points:[0,0,150,0],
      draggable: true
    });
    this.addShape(this.line);
  }
  rect(){
    if(this.cursorXin != this.cursorXfin || this.cursorYin != this.cursorYfin) return;
    this.rectangle = new Konva.Rect({
      x: this.stage.getPointerPosition()?.x,
      y: this.stage.getPointerPosition()?.y,
      width: 100,
      height: 40,
      stroke: "black",
      draggable: true
    });
    this.addShape(this.rectangle);
  }
  clearScreen(){
    this.layer.destroy();
  }

}
