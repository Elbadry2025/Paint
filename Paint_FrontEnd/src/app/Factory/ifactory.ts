import Konva from "konva"
import { IShape } from "../Shapes/ishape"

export interface IFactory {
    constructKonvaShape(type: string, stage: Konva.Stage, isPaste: boolean, copyShape:Konva.Shape): Konva.Shape
    constructBackEndShape(type: string, shape: Konva.Shape, update: boolean, deleteflag: boolean): IShape
    constructSquareFromBack(x: number, y: number, stroke: string, strokeWidth: number, fill: string,
        rotate: number, draggable: boolean, id: string, type: string, sideLength: number): Konva.Shape
    constructRectangleFromBack(x: number, y: number, stroke: string, strokeWidth: number, fill: string,
        rotate: number, draggable: boolean, id: string, type: string, width: number, height: number): Konva.Shape
    constructCircleFromBack(x: number, y: number, stroke: string, strokeWidth: number, fill: string,
        rotate: number, draggable: boolean, id: string, type: string, radius: number): Konva.Shape
    constructEllipseFromBack(x: number, y: number, stroke: string, strokeWidth: number, fill: string,
        rotate: number, draggable: boolean, id: string, type: string, radiusX: number, radiusY: number): Konva.Shape
    constructLineFromBack(x: number, y: number, stroke: string, strokeWidth: number, fill: string,
        rotate: number, draggable: boolean, id: string, type: string, points: number[]): Konva.Shape
    constructTriangleFromBack(x: number, y: number, stroke: string, strokeWidth: number, fill: string,
        rotate: number, draggable: boolean, id: string, type: string, points: number[]): Konva.Shape
    getAvailableID(): string;
}
