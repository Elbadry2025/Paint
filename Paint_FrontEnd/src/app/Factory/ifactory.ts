import Konva from "konva"
import { IShape } from "../Shapes/ishape"

export interface IFactory {
    constructKonvaShape(type: string, stage: Konva.Stage, isPaste: boolean, copyShape:Konva.Shape): Konva.Shape
    constructBackEndShape(type: string): IShape
}
