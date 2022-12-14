import { IShape } from "./ishape";

export class Circle extends IShape{
    private _radius: number;
    
    constructor(x: number, y: number, stroke: string, strokeWidth: number, fill: string, rotate: number, draggable: boolean, id: string, update: boolean, deleteflag: boolean, radius: number){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._radius = radius;
        this.type = "circle";
    }

    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }
}
