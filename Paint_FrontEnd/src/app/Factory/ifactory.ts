import Konva from "konva"
import { IShape } from "../Shapes/ishape"

export interface IFactory {
    constructKonvaShape(type: string, stage: Konva.Stage, isPaste: boolean, copyShape:Konva.Shape): Konva.Shape
    constructBackEndShape(type: string, shape: Konva.Shape): IShape
    constructSquareFromBack(x: number, y: number, stroke: string, fill: string,
        rotate: number, draggable: boolean, id: string, type: string, sideLength: number): Konva.Shape
}
