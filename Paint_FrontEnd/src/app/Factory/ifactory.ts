import Konva from "konva"
import { IShape } from "../Shapes/ishape"

export interface IFactory {
    constructKonvaShape(type: string, stage: Konva.Stage): Konva.Shape
    constructBackEndShape(): IShape
}
