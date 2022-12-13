import Konva from "konva";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { IShape } from "../Shapes/ishape";
import { Square } from "../Shapes/square";
import { IFactory } from "./ifactory";

export class Factory implements IFactory {
    shape!: Konva.Shape;
    backendShape!: IShape;
    availableID: number = 0;
    constructKonvaShape(type: string, stage: Konva.Stage, isPaste: boolean , copyShape: Konva.Shape): Konva.Shape {
        if(isPaste){
            if(copyShape instanceof Konva.Rect){
                this.shape = new Konva.Rect({
                    x : stage.getPointerPosition()?.x,
                    y : stage.getPointerPosition()?.y,
                    width: copyShape.width(),
                    height: copyShape.height(),
                    stroke: copyShape.stroke(),
                    strokeWidth: copyShape.strokeWidth(),
                    fill: copyShape.fill(),
                    draggable: false
                })
           }else if(copyShape instanceof Konva.Line){
            this.shape = new Konva.Line({
                x: stage.getPointerPosition()?.x,
                y: stage.getPointerPosition()?.y,
                points: copyShape.points(),
                stroke: copyShape.stroke(),
                strokeWidth: copyShape.strokeWidth(),
                fill: copyShape.fill(),
                draggable: false
            })
           }else if(copyShape instanceof Konva.Circle){
                this.shape = new Konva.Circle({
                    x : stage.getPointerPosition()?.x,
                    y : stage.getPointerPosition()?.y,
                    radius: copyShape.radius(),
                    stroke: copyShape.stroke(),
                    strokeWidth: copyShape.strokeWidth(),
                    fill: copyShape.fill(),
                    draggable: false
                })
           }else if(copyShape instanceof Konva.Ellipse){
                this.shape = new Konva.Ellipse({
                    x : stage.getPointerPosition()?.x,
                    y : stage.getPointerPosition()?.y,
                    radiusX: copyShape.radiusX(),
                    radiusY: copyShape.radiusY(),
                    fill: copyShape.fill(),
                    stroke: copyShape.stroke(),
                    strokeWidth: copyShape.strokeWidth(),
                    draggable: false
                })
           }
        }else{
            if (type == "ellipse") {
                this.shape = new Konva.Ellipse({
                    x: stage.getPointerPosition()?.x,
                    y: stage.getPointerPosition()?.y,
                    radiusX: 0,
                    radiusY: 0,
                    stroke: "black",
                    draggable: false
                })
            } else if (type == "square") {
                this.shape = new Konva.Rect({
                    x: stage.getPointerPosition()?.x,
                    y: stage.getPointerPosition()?.y,
                    width: 0,
                    height: 0,
                    stroke: "black",
                    draggable: false
                })
            } else if (type == "circle") {
                this.shape = new Konva.Circle({
                    x: stage.getPointerPosition()?.x,
                    y: stage.getPointerPosition()?.y,
                    radius: 0,
                    stroke: "black",
                    draggable: false
                })
            } else if (type == "rectangle") {
                this.shape = new Konva.Rect({
                    x: stage.getPointerPosition()?.x,
                    y: stage.getPointerPosition()?.y,
                    width: 0,
                    height: 0,
                    stroke: "black",
                    draggable: false
                })
            } else if (type == "line") {
                this.shape = new Konva.Line({
                    x: stage.getPointerPosition()?.x,
                    y: stage.getPointerPosition()?.y,
                    points: [0, 0],
                    stroke: "black",
                    draggable: false
                })
            } else if (type == "triangle") {
                this.shape = new Konva.Line({
                    x: stage.getPointerPosition()?.x,
                    y: stage.getPointerPosition()?.y,
                    points: [0, 0, 0, 0, 0, 0, 0, 0],
                    stroke: "black",
                    draggable: false
                })
            } else if (type == "brush") {
                this.shape = new Konva.Line({
                    x: stage.getPointerPosition()?.x,
                    y: stage.getPointerPosition()?.y,
                    points: [],
                    stroke: "black",
                    draggable: false
                })
            }
            this.shape.id(this.availableID.toString());
            this.availableID++;
        }
        return this.shape;
    }
    constructBackEndShape(type: string, shape: Konva.Shape): IShape {
        if(type == "square" && shape instanceof Konva.Rect){
            this.backendShape = new Square(
                shape.x(),
                shape.y(), 
                shape.stroke(), 
                shape.fill(), 
                shape.rotation(), 
                shape.draggable(), 
                shape.id(), 
                shape.width()
            );
        }
        return this.backendShape;
    }
    constructSquareFromBack(x: number, y: number, stroke: string, fill: string,
        rotate: number, draggable: boolean, id: string, type: string, sideLength: number): Konva.Shape {
        this.shape = new Konva.Rect({
            x: x,
            y: y,
            width: sideLength,
            height: sideLength,
            stroke: stroke,
            draggable: draggable,
            rotation: rotate,
            fill: fill,
            id: id
        })
        return this.shape;
    }
    
}
