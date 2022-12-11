import { IShape } from "./ishape";

export class circle extends IShape {
    
    private _sideLength: number;

    constructor(x: number, y: number, stroke: string, fill: string, rotate: number, draggable: boolean, id: number, sideLength: number){
        super(x, y, stroke, fill, rotate, draggable, id);
        this._sideLength = sideLength;
        this.type = "circle";
    }

    public get sideLength(): number {
        return this._sideLength;
    }
    public set sideLength(value: number) {
        this._sideLength = value;
    }
}
