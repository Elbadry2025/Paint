import { IShape } from "./ishape";

export class Square extends IShape {
    
    private _sideLength: number;

    constructor(x: number, y: number, stroke: string, strokeWidth: number, fill: string, rotate: number, draggable: boolean, id: string, update: boolean, deleteflag: boolean, sideLength: number){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._sideLength = sideLength;
        this.type = "square";
    }

    public get sideLength(): number {
        return this._sideLength;
    }
    public set sideLength(value: number) {
        this._sideLength = value;
    }
}
