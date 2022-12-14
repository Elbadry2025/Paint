import { IShape } from "./ishape";

export class Line extends IShape{
    private _points: number[];

    constructor(x: number, y: number, stroke: string, strokeWidth: number, fill: string, rotate: number, draggable: boolean, id: string, update: boolean, deleteflag: boolean, points: number[]){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._points = points;
        this.type = "line";
    }

    public get points(): number[] {
        return this._points;
    }
    public set points(value: number[]) {
        this._points = value;
    }
}
