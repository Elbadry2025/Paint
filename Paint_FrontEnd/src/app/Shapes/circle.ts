import { IShape } from "./ishape";

export class circle extends IShape {
    
    private _radius: number;

    constructor(x: number, y: number, stroke: string, fill: string, rotate: number, draggable: boolean, id: number, radius: number){
        super(x, y, stroke, fill, rotate, draggable, id);
        this._radius = radius;
        this.type = "circle";
    }

    public get sideLength(): number {
        return this._radius;
    }
    public set sideLength(value: number) {
        this._radius= value;
    }
}
