import Konva from "konva";
import { IShape } from "../Shapes/ishape";
import { IFactory } from "./ifactory";

export class Factory implements IFactory {
    shape!: Konva.Shape;
    constructKonvaShape(type: string, stage: Konva.Stage): Konva.Shape {
        if(type == "ellipse"){
            this.shape = new Konva.Ellipse({
                x: stage.getPointerPosition()?.x,
                y: stage.getPointerPosition()?.y,
                radiusX: 0,
                radiusY: 0,
                stroke: "black",
                draggable: true
            })
        }else if(type == "square"){
            this.shape = new Konva.Rect({
                x: stage.getPointerPosition()?.x,
                y: stage.getPointerPosition()?.y,
                width: 0,
                height: 0,
                stroke: "black",
                draggable: true
            })
        }else if(type == "circle"){
            this.shape = new Konva.Circle({
                x: stage.getPointerPosition()?.x,
                y: stage.getPointerPosition()?.y,
                radius: 0,
                stroke: "black",
                draggable: true
            })
        }else if(type == "rectangle"){
            this.shape = new Konva.Rect({
                x: stage.getPointerPosition()?.x,
                y: stage.getPointerPosition()?.y,
                width: 0,
                height: 0,
                stroke: "black",
                draggable: true
            })
        }else if(type == "line"){
            this.shape = new Konva.Line({
                x: stage.getPointerPosition()?.x,
                y: stage.getPointerPosition()?.y,
                points:[0,0],
                stroke: "black",
                draggable: true
            })
        }else if(type == "triangle"){
            this.shape = new Konva.Line({
                x: stage.getPointerPosition()?.x,
                y: stage.getPointerPosition()?.y,
                points:[0,0,0,0,0,0,0,0],
                stroke: "black",
                draggable: true
            })
        }
        return this.shape;
    }
    constructBackEndShape(): IShape {
        throw new Error("Method not implemented.");
    }
    
}
